const axios = require('axios');

class AIService {
  constructor() {
    this.service = process.env.AI_SERVICE || 'gemini';
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.anthropicKey = process.env.ANTHROPIC_API_KEY;
    this.geminiKey = process.env.GEMINI_API_KEY;
  }

  async generateCaptions(imageDescription, tone = 'engaging', userNiche = 'general') {
    const prompt = `You are an expert Instagram content creator. Generate 3 compelling Instagram captions for a ${userNiche} post.

Image description: ${imageDescription}

Tone: ${tone}

Requirements:
- Each caption should be unique and ${tone}
- Include relevant emojis
- Make them engaging and likely to get high engagement
- Keep them concise (1-3 sentences each)
- Don't include hashtags (those will be separate)

Return the response in this exact JSON format:
{
  "captions": [
    {"text": "caption 1", "tone": "${tone}"},
    {"text": "caption 2", "tone": "${tone}"},
    {"text": "caption 3", "tone": "${tone}"}
  ]
}`;

    try {
      const response = await this.callAI(prompt);
      return this.parseCaptionsResponse(response);
    } catch (error) {
      console.error('Error generating captions:', error.message);
      return this.getFallbackCaptions(tone);
    }
  }

  async generateHashtags(imageDescription, userNiche = 'general') {
    const prompt = `You are an expert in Instagram hashtag strategy. Generate 20 relevant hashtags for this ${userNiche} Instagram post.

Image description: ${imageDescription}

Requirements:
- Mix of popular (high volume) and niche (targeted) hashtags
- Include 5-7 high-volume hashtags (500k+ posts)
- Include 8-10 medium-volume hashtags (50k-500k posts)
- Include 5-7 low-volume hashtags (under 50k posts)
- All hashtags must be relevant to the content
- Don't include the # symbol

Return the response in this exact JSON format:
{
  "hashtags": [
    {"tag": "hashtagname", "category": "high-volume"},
    {"tag": "hashtagname", "category": "medium-volume"},
    {"tag": "hashtagname", "category": "low-volume"}
  ]
}`;

    try {
      const response = await this.callAI(prompt);
      return this.parseHashtagsResponse(response);
    } catch (error) {
      console.error('Error generating hashtags:', error.message);
      return this.getFallbackHashtags(userNiche);
    }
  }

  async analyzeContent(imageDescription, userNiche = 'general') {
    const prompt = `You are an expert Instagram content analyst. Analyze this image and provide insights.

Image description: ${imageDescription}
User niche: ${userNiche}

Provide:
1. Detected objects/subjects (list 3-5 main elements)
2. Dominant colors (list 2-3)
3. Overall mood/vibe (one word)
4. A brief engaging description (one sentence)
5. Best posting time (morning/afternoon/evening)
6. 3 improvement suggestions
7. 3 engagement tips

Return the response in this exact JSON format:
{
  "detectedObjects": ["object1", "object2", "object3"],
  "colors": ["color1", "color2"],
  "mood": "mood",
  "description": "description",
  "bestPostingTime": "time",
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "engagementTips": ["tip1", "tip2", "tip3"]
}`;

    try {
      const response = await this.callAI(prompt);
      return this.parseAnalysisResponse(response);
    } catch (error) {
      console.error('Error analyzing content:', error.message);
      return this.getFallbackAnalysis();
    }
  }

  async callAI(prompt) {
    if (this.service === 'openai' && this.openaiKey) {
      return await this.callOpenAI(prompt);
    } else if (this.service === 'anthropic' && this.anthropicKey) {
      return await this.callAnthropic(prompt);
    } else if (this.service === 'gemini' && this.geminiKey) {
      return await this.callGemini(prompt);
    } else {
      throw new Error('No AI service configured. Please set GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY in .env file');
    }
  }

  async callOpenAI(prompt) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${this.openaiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  }

  async callAnthropic(prompt) {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': this.anthropicKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
      }
    );
    return response.data.content[0].text;
  }

  async callGemini(prompt) {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiKey}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  }

  parseCaptionsResponse(response) {
    try {
      const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed.captions || [];
    } catch (error) {
      console.error('Error parsing captions:', error);
      return this.getFallbackCaptions('engaging');
    }
  }

  parseHashtagsResponse(response) {
    try {
      const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed.hashtags || [];
    } catch (error) {
      console.error('Error parsing hashtags:', error);
      return this.getFallbackHashtags('general');
    }
  }

  parseAnalysisResponse(response) {
    try {
      const cleaned = response.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return {
        detectedObjects: parsed.detectedObjects || [],
        colors: parsed.colors || [],
        mood: parsed.mood || 'neutral',
        description: parsed.description || '',
        bestPostingTime: parsed.bestPostingTime || 'afternoon',
        improvements: parsed.improvements || [],
        engagementTips: parsed.engagementTips || []
      };
    } catch (error) {
      console.error('Error parsing analysis:', error);
      return this.getFallbackAnalysis();
    }
  }

  getFallbackCaptions(tone) {
    return [
      { text: "✨ New moment captured! What do you think? 📸", tone: tone },
      { text: "Loving this vibe! 💫 Drop a ❤️ if you agree!", tone: tone },
      { text: "Making memories one post at a time 🌟", tone: tone }
    ];
  }

  getFallbackHashtags(niche) {
    const common = [
      { tag: 'instagram', category: 'high-volume' },
      { tag: 'instagood', category: 'high-volume' },
      { tag: 'photooftheday', category: 'high-volume' },
      { tag: 'love', category: 'high-volume' },
      { tag: 'beautiful', category: 'medium-volume' },
      { tag: 'happy', category: 'medium-volume' },
      { tag: 'follow', category: 'medium-volume' },
      { tag: 'like4like', category: 'medium-volume' },
      { tag: niche, category: 'low-volume' },
      { tag: `${niche}gram`, category: 'low-volume' }
    ];
    return common;
  }

  getFallbackAnalysis() {
    return {
      detectedObjects: ['content', 'image'],
      colors: ['vibrant', 'natural'],
      mood: 'engaging',
      description: 'An interesting post ready to be shared',
      bestPostingTime: 'afternoon',
      improvements: [
        'Consider adding more lighting',
        'Try different angles',
        'Experiment with filters'
      ],
      engagementTips: [
        'Ask a question in your caption',
        'Use story stickers to boost engagement',
        'Post consistently'
      ]
    };
  }
}

module.exports = new AIService();
