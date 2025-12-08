import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  X, // 👈 added
} from "lucide-react";
import { farmerQutoes } from "../assets/index.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const farmingQuotes = [
  { text: "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight on both ways.", author: "John F. Kennedy" },
  { text: "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness.", author: "Thomas Jefferson" },
  { text: "Farming looks mighty easy when your plow is a pencil and you're a thousand miles from the corn field.", author: "Dwight D. Eisenhower" },
  { text: "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.", author: "Masanobu Fukuoka" },
  { text: "If you tickle the earth with a hoe she laughs with a harvest.", author: "Douglas Jerrold" },
  { text: "The discovery of agriculture was the first big step toward a civilized life.", author: "Arthur Keith" },
  { text: "Agriculture is the most healthful, most useful and most noble employment of man.", author: "George Washington" },
  { text: "Cultivators of the earth are the most valuable citizens. They are the most vigorous, the most independent, the most virtuous, and they are tied to their country and wedded to its liberty and interests by the most lasting bands.", author: "Thomas Jefferson" },
  { text: "I would rather be on my farm than be emperor of the world.", author: "George Washington" },
  { text: "The master's eye is the best fertilizer.", author: "Pliny the Elder" },
  { text: "Farming is a profession of hope.", author: "Brian Brett" },
  { text: "To make agriculture sustainable, the grower has to be able to make a profit.", author: "Sam Farr" },
  { text: "Life on a farm is a school of patience; you can't hurry the crops or make an ox in two days.", author: "Henri Alain-Fournier" },
  { text: "The story of family farming underscores a legacy of sustainability.", author: "Amanda Beal" },
  { text: "No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem.", author: "Booker T. Washington" },
  { text: "Agriculture is the foundation of manufacture and commerce.", author: "C.L.R. James" },
  { text: "A good farmer is nothing more nor less than a handyman with a sense of humus.", author: "E.B. White" },
  { text: "Without agriculture, it is not possible to have a city, stock market, banks, university, church or army. Agriculture is the foundation of civilization and any stable economy.", author: "Allan Savory" },
  { text: "It is only the farmer who faithfully plants seeds in the Spring, who reaps a harvest in the Autumn.", author: "B.C. Forbes" },
  { text: "Farming isn't just a job, it's a way of life.", author: "Unknown" },
  { text: "You know, farming looks mighty easy when your plow is a pencil, and you're a thousand miles from the corn field.", author: "Dwight D. Eisenhower" },
  { text: "If agriculture goes wrong, nothing else will have a chance to go right.", author: "M. S. Swaminathan" },
  { text: "We have neglected the truth that a good farmer is a craftsman of the highest order, a kind of artist.", author: "Wendell Berry" },
  { text: "Whatever you do, do it with all your might. Work at it, early and late, in season and out of season, not leaving a stone unturned, and never deferring for a single hour that which can be done just as well now.", author: "P. T. Barnum" },
  { text: "The best fertilizer is the gardener's shadow.", author: "Unknown" },
  { text: "Agriculture for an honorable and highminded man, is the best of all occupations or arts by which men procure the means of living.", author: "Xenophon" },
  { text: "There are two spiritual dangers in not owning a farm. One is the danger of supposing that breakfast comes from the grocery, and the other that heat comes from the furnace.", author: "Aldo Leopold" },
  { text: "Everything else can wait, agriculture cannot.", author: "Norman Borlaug" },
  { text: "Strong communities are built around local, real food. Food we trust to nourish our bodies, the farmer and planet.", author: "Kimbal Musk" },
  { text: "Farming is the art of losing money while working 400 hours a month to feed people who think you are trying to kill them.", author: "Unknown" },
  { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
  { text: "The farmer has to be an optimist or he wouldn't still be a farmer.", author: "Will Rogers" },
  { text: "Agriculture is the keenest sensitization to the physical universe.", author: "Berry" },
  { text: "Soil is a living entity, not a dead residue.", author: "Unknown" },
  { text: "The proper role of government, however, is that of partner with the farmer -- never his master.", author: "Ezra Taft Benson" },
  { text: "Teaching kids how to feed themselves and how to live in a community responsibly is the center of an education.", author: "Alice Waters" },
  { text: "Farming is a matter of dirt and dung.", author: "Unknown" },
  { text: "Good farmers, who take seriously their duties as stewards of Creation and of their land's inheritors, contribute to the welfare of society in more ways than society usually acknowledges, or even knows.", author: "Wendell Berry" },
  { text: "The first supermarket was the soil.", author: "Unknown" },
  { text: "Eat clean, stay fit, and have a burger to stay sane.", author: "Gigi Hadid" },
  { text: "I think having land and not ruining it is the most beautiful art that anybody could ever want.", author: "Andy Warhol" },
  { text: "When tillage begins, other arts follow. The farmers, therefore, are the founders of human civilization.", author: "Daniel Webster" },
  { text: "Farming is mostly about killing things: weeds, insects, diseases, rodents, and sometimes, your own back.", author: "Unknown" },
  { text: "Never answer a question from a farmer.", author: "Hubert H. Humphrey" },
  { text: "A fertile soil alone does not carry agriculture to perfection.", author: "E.H. Stirling" },
  { text: "Keep your seeds dry and your powder dry.", author: "Unknown" },
  { text: "Farmers are the only indispensable people on the face of the earth.", author: "Li Zhaoxing" },
  { text: "To forget how to dig the earth and to tend the soil is to forget ourselves.", author: "Mahatma Gandhi" },
  { text: "The land is the only thing in the world worth working for, worth fighting for, worth dying for, because it's the only thing that lasts.", author: "Margaret Mitchell" },
  { text: "He who plants a tree plants a hope.", author: "Lucy Larcom" },
  { text: "A farm includes the passion of the farmer's heart, the interest of the farm's customers, the biological activity in the soil, the species of plants and animals, the weather, and the consumer's health.", author: "Joel Salatin" },
  { text: "Farming with live animals is a 7 day a week, legal form of slavery.", author: "George Segal" },
  { text: "The cure for all the ills and wrongs, the cares, the sorrows, and the crimes of humanity, all lie in the one word 'love'. It is the divine vitality that everywhere produces and restores life.", author: "Lydia Maria Child" },
  { text: "I love the smell of fresh dirt.", author: "Unknown" },
  { text: "We need a new generation of farmers.", author: "Unknown" },
  { text: "Organic farming appeals to me because it involves searching for and discovering nature's pathways, as opposed to the formulaic approach of chemical farming.", author: "Eliot Coleman" },
  { text: "An onion can make people cry but there's never been a vegetable that can make people laugh.", author: "Will Rogers" },
  { text: "The garden is the poor man's apothecary.", author: "German Proverb" },
  { text: "Bread is the staff of life.", author: "Unknown" },
  { text: "As a farmer, you learn to trust the process.", author: "Unknown" },
  { text: "Every day involves a leap of faith.", author: "Unknown" },
  { text: "You can't eat money.", author: "Cree Prophecy" },
  { text: "If we do not plant knowledge when young, it will give us no shade when we are old.", author: "Lord Chesterfield" },
  { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu" },
  { text: "In every gardener there is a child who believes in The Seed Fairy.", author: "Robert Brault" },
  { text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.", author: "Alfred Austin" },
  { text: "Corn is a greedy crop.", author: "Unknown" },
  { text: "Rain makes grain.", author: "Unknown" },
  { text: "Farming requires patience, persistence, and perspiration.", author: "Unknown" },
  { text: "There is no culture without agriculture.", author: "Unknown" },
  { text: "Farming is the backbone of the economy.", author: "Unknown" },
  { text: "Plow deep while sluggards sleep.", author: "Benjamin Franklin" },
  { text: "The earth is the mother of all people, and all people should have equal rights upon it.", author: "Chief Joseph" },
  { text: "Take care of the land and the land will take care of you.", author: "H. Bennett" },
  { text: "A society grows great when old men plant trees whose shade they know they shall never sit in.", author: "Greek Proverb" },
  { text: "Feed the soil, not the plant.", author: "Unknown" },
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Harvesting is the most satisfying time of the year.", author: "Unknown" },
  { text: "Sowing is an act of faith.", author: "Unknown" },
  { text: "Weeds are nature's graffiti.", author: "Janice Maeditere" },
  { text: "Compost is the gold of the garden.", author: "Unknown" },
  { text: "Water is the driving force of all nature.", author: "Leonardo da Vinci" },
  { text: "Every seed is a promise.", author: "Unknown" },
  { text: "Gardening is cheaper than therapy and you get tomatoes.", author: "Unknown" },
  { text: "Life begins the day you start a garden.", author: "Chinese Proverb" },
  { text: "My grandfather used to say that once in your life you need a doctor, a lawyer, a policeman and a preacher but every day, three times a day, you need a farmer.", author: "Brenda Schoepp" },
  { text: "Farming is a profession of faith.", author: "Unknown" },
  { text: "Cows are gentle giants.", author: "Unknown" },
  { text: "Sheep are born looking for a place to die.", author: "Old Farming Saying" },
  { text: "A farm is a manipulative creature. There is no such thing as finished. Work comes in a stream and has no end.", author: "Unknown" },
  { text: "If you eat, you are involved in agriculture.", author: "Wendell Berry" },
  { text: "Without the farmer, there is no food.", author: "Unknown" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Don't count your chickens before they hatch.", author: "Aesop" },
  { text: "Make hay while the sun shines.", author: "John Heywood" },
  { text: "Reap what you sow.", author: "Galatians 6:7" },
  { text: "Early to bed and early to rise makes a man healthy, wealthy and wise.", author: "Benjamin Franklin" },
  { text: "It is not the farm that makes the farmer, but the love and hard work.", author: "Unknown" }
];

export const getPersonalizedQuote = () => {
  const randomIndex = Math.floor(Math.random() * farmingQuotes.length);
  return farmingQuotes[randomIndex];
};

const fetchPosts = async (setPosts) => {
  try {
    const res = await axios.get("http://localhost:3693/api/v1/community/posts");
    if (res.data.success) {
      const posts = res.data.posts.slice(0, 3);
      setPosts(posts);
    }
  } catch (error) {
    toast.error(error.response?.data?.error || error.message);
  }
};

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const HeroSection1 = () => {
  const [posts, setPosts] = useState([]);
  const [showQuote, setShowQuote] = useState(false);
  const [quote,setQuote] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  useEffect(()=>{
    const random = Math.floor(Math.random() * 100);
    setQuote(farmingQuotes[random])
  },[showQuote])

  return (
    <div className="relative">
      {/* Main content (will blur when modal open) */}
      <div
        className={`transition duration-200 ${
          showQuote ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <section className="relative bg-gradient-to-r from-emerald-900 via-green-800 to-lime-800 py-20 text-white">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <div className="bg-lime-300/30 rounded-full p-4 border-2 border-lime-400">
                <ShieldCheck className="h-12 w-12 text-lime-300" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold ml-4">
                We’re building powerful AI solutions that make farming smarter
                and easier.
              </h2>
            </div>
            <button
              onClick={() => navigate("/add-plot")}
              className="mt-8 md:mt-0 px-8 py-3 rounded-full bg-white text-emerald-700 font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-md inline-flex items-center justify-center"
            >
              Start Now
            </button>
          </div>
        </section>

        {/* ✉️ Quote Form */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-lime-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <img
              src={farmerQutoes}
              alt="Farmer"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <div className="text-center lg:text-left">
              <button
                onClick={() => setShowQuote(true)}
                className="px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-transform transform hover:scale-105 shadow-md"
              >
                Get Your Personalized Quote
              </button>
            </div>
          </div>
        </section>

        {/* 📰 Latest Posts */}
        <section className="py-16 bg-gradient-to-b from-lime-50 to-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
              Latest Posts & Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  <div className="relative">
                    {post.images[0] ? (
                      <img
                        src={post.images[0]}
                        alt="image not available"
                        className="w-full h-56 object-fit"
                      />
                    ) : (
                      <img
                        src={
                          "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
                        }
                        alt="image not available"
                        className="w-full h-56 object-fit"
                      />
                    )}
                  </div>
                  <div className="p-6 text-left">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                      <p>{post.farmer.name}</p>
                    </h3>
                    <p
                      onClick={() => navigate("/blog-home")}
                      className="inline-flex items-center mt-4 font-medium text-emerald-600 hover:text-emerald-800 cursor-pointer"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-2" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal overlay */}
      {showQuote && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 sm:p-8">
            <button
              onClick={() => setShowQuote(false)}
              className="absolute top-3 right-3 rounded-full p-1.5 bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            <h3 className="text-2xl font-bold text-emerald-900 mb-3">
              Your Personalized Quote
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              "{quote?.text}" - <span className="font-semibold">{quote?.author}</span>
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowQuote(false)}
                className="px-6 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection1;
