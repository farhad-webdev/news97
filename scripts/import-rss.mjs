import { XMLParser } from 'fast-xml-parser';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.');
}

const feeds = [
  { name: 'প্রথম আলো', url: 'https://www.prothomalo.com/feed' },
  { name: 'BBC বাংলা', url: 'https://feeds.bbci.co.uk/bengali/rss.xml' },
];
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  processEntities: true,
  htmlEntities: true,
});

function textValue(value) {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(textValue).join(' ');
  if (value && typeof value === 'object') {
    return textValue(value['#text'] ?? value['#cdata'] ?? '');
  }
  return '';
}

function categoryFor(item) {
  const text = `${textValue(item.category)} ${textValue(item['media:keywords'])}`.toLowerCase();
  if (/রাজনীতি|politic|election/.test(text)) return 'politics';
  if (/অর্থ|বাণিজ্য|ব্যবসা|econom|business/.test(text)) return 'economy';
  if (/স্বাস্থ্য|চিকিৎসা|health/.test(text)) return 'health';
  if (/অপরাধ|crime|court|আইন/.test(text)) return 'crime';
  if (/খেলা|sport/.test(text)) return 'sports';
  if (/প্রযুক্তি|technology|tech/.test(text)) return 'technology';
  if (/বাংলাদেশ|জাতীয়|জাতীয়|দেশ/.test(text)) return 'national';
  return 'international';
}

function cleanExcerpt(value) {
  return textValue(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

function imageFor(item) {
  const candidates = [
    item['media:thumbnail'],
    item['media:content'],
    item.enclosure,
  ];
  for (const candidate of candidates) {
    const image = Array.isArray(candidate) ? candidate[0] : candidate;
    if (image && typeof image === 'object' && /^https:\/\//.test(image['@url'] ?? '')) {
      return image['@url'];
    }
  }
  return null;
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { 'user-agent': 'DeshbartaNewsBot/1.0 (+RSS import)' },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`RSS request failed for ${feed.name}: HTTP ${response.status}`);
  const parsed = parser.parse(await response.text());
  const items = parsed.rss?.channel?.item ?? parsed.feed?.entry ?? [];
  return (Array.isArray(items) ? items : [items]).slice(0, 30).flatMap((item) => {
    const title = cleanExcerpt(item.title);
    const sourceUrl = textValue(item.link?.['@href'] ?? item.link);
    if (!title || !/^https?:\/\//.test(sourceUrl)) return [];
    const publishedAt = Date.parse(textValue(item.pubDate ?? item.published ?? item.updated));
    return [{
      source: feed.name,
      source_url: sourceUrl,
      title,
      excerpt: cleanExcerpt(item.description ?? item.summary),
      image_url: imageFor(item),
      category_slug: categoryFor(item),
      ...(Number.isNaN(publishedAt) ? {} : { published_at: new Date(publishedAt).toISOString() }),
    }];
  });
}

let imported = 0;
for (const feed of feeds) {
  const articles = await fetchFeed(feed);
  const response = await fetch(`${supabaseUrl}/rest/v1/news_articles?on_conflict=source_url`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      authorization: `Bearer ${serviceRoleKey}`,
      'content-type': 'application/json',
      prefer: 'resolution=ignore-duplicates,return=minimal',
    },
    body: JSON.stringify(articles),
  });
  if (!response.ok) {
    throw new Error(`Could not save ${feed.name} RSS drafts: HTTP ${response.status} ${await response.text()}`);
  }
  imported += articles.length;
  console.log(`${feed.name}: checked ${articles.length} feed items`);
}
console.log(`RSS import complete; checked ${imported} items.`);
