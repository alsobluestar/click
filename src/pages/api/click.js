import { createClient } from 'redis';

export default async function handler(req, res) {
  const client = createClient("redis://localhost:6379");

  if (req.method === 'GET') {
    try {
      await client.connect();
      const count = await client.get('count');
      res.json({ count: parseInt(count) });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Internal Server Error");
    } finally {
      client.disconnect();
    }

  } else if (req.method === 'POST') {
    try {
      await client.connect();
      const count = await client.incr('count');
      res.json({ count });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Internal Server Error");
    } finally {
      client.disconnect();
    }
  } else {
    res.status(405).json({ "error": "Method Not Allowed :(" });
  }
}









