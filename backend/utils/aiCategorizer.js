const OpenAI = require("openai");
const client = new OpenAI();

module.exports = async list => {
  const prompt = `
Classify transactions into: food, travel, shopping, entertainment,
necessity, health, rent, junk.

Return JSON array:
{ merchant, category, isJunk, confidence }

If unclear: category="unknown", confidence=0.4.

Transactions:
${JSON.stringify(list)}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return JSON.parse(res.choices[0].message.content);
};