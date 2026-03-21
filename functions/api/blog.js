export async function onRequest() {
  try {
    const res = await fetch(
      'https://maulj24.com/wp-json/wp/v2/posts?per_page=10&_fields=id,title,link,date&orderby=date&order=desc'
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
