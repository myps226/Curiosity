
import { Category, Difficulty, CuriosityTopic } from './types';

export const CATEGORIES: Category[] = [
  'Random',
  'Plants & Nature',
  'Marine Life',
  'Personality & Psychology',
  'Travel',
  'World Cultures',
  'Urban Planning',
  'Philosophy',
  'Technology',
  'History',
  'Everyday Mysteries'
];

export const DIFFICULTIES: Difficulty[] = ['Random', 'Easy', 'Medium', 'Hard'];

export const INITIAL_TOPICS: CuriosityTopic[] = [
  {
    id: '1',
    category: 'Marine Life',
    question: "Why do seashells form spiral shapes?",
    prompts: [
      "How does the snail know when to grow its shell larger?",
      "Is the spiral purely for protection or also for hydrodynamics?",
      "Can we find the Fibonacci sequence in underwater structures?",
      "What determines the direction of the spiral (clockwise vs counter)?",
      "Do different calcium concentrations in water affect shell thickness?",
      "How do internal chambers help some nautiluses float?"
    ],
    direction: "Focus on the intersection of mathematics and biological survival.",
    activity: "Draw a spiral and see if you can fit it perfectly into a rectangle."
  },
  {
    id: '2',
    category: 'Philosophy',
    question: "If everyone had the same memory, would we be the same person?",
    prompts: [
      "Is identity built by what we do or what we remember?",
      "How much of our personality is just a reaction to our history?",
      "Could two people with identical memories eventually diverge?",
      "What role does the physical body play in our sense of self?",
      "Would empathy be absolute if we shared all experiences?",
      "Does a unique future make a unique person even with a shared past?"
    ],
    direction: "Explore the concept of the 'Self' beyond data storage.",
    activity: "Recall a core memory and imagine how it would feel if it happened to someone else."
  },
  {
    id: '3',
    category: 'Urban Planning',
    question: "How would cities look if we never invented cars?",
    prompts: [
      "Would we have more green spaces or higher density?",
      "How would social interactions change in a walking-only city?",
      "What would happen to the 'suburbs'?",
      "How would vertical transportation evolve in building design?",
      "Would local noise levels drastically improve public health?",
      "How would 'commerce' look if delivery trucks didn't exist?"
    ],
    direction: "Discuss human-centric design vs infrastructure-centric design.",
    activity: "Walk 15 minutes in your neighborhood and count how many spaces are for people vs machines."
  },
  {
    id: '4',
    category: 'Plants & Nature',
    question: "Do trees actually 'talk' to each other underground?",
    prompts: [
      "What role do fungal networks (mycorrhizae) play in nutrient sharing?",
      "Can a mother tree recognize its own saplings?",
      "How do forests coordinate defenses against pests?",
      "Is there a 'language' of chemical signals we are missing?",
      "Does tree competition look different in diverse vs mono-crop forests?",
      "How does the speed of tree 'conversations' compare to human time?"
    ],
    direction: "Explore the Wood Wide Web and symbiotic relationships.",
    activity: "Find two different tree species nearby and look for where their roots might cross."
  },
  {
    id: '5',
    category: 'History',
    question: "Why did ancient civilizations across the world all build pyramids?",
    prompts: [
      "Is it the most stable shape for primitive stone stacking?",
      "Did different cultures communicate or reach the same idea independently?",
      "What do the alignments with stars tell us about their priorities?",
      "Were they always intended as tombs or did they serve multiple purposes?",
      "How did they manage the logistics of food for thousands of workers?",
      "Why did we stop building giant stone monuments for thousands of years?"
    ],
    direction: "Investigate structural engineering and cultural symbolism.",
    activity: "Try to stack different household items into a pyramid shape and observe which are hardest."
  }
];
