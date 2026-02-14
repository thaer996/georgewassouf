
import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const Biography: React.FC = () => {
  const { lang, isRtl } = useContext(LanguageContext);

  const translations = {
    EN: {
      tag: "Iconic Performer",
      tagSub: "The Sultan's Essence",
      title: "A Legacy Beyond Time",
      p1: "Born in Kafroun, Syria, George Wassouf began his journey at a young age, quickly becoming a household name across the Arab world. His unique voice, filled with raw emotion and unparalleled tarab, earned him the title 'Sultan El-Tarab'.",
      p2: "With over 30 albums and hundreds of sold-out concerts globally, Wassouf has mastered the art of capturing the human experience through melody. His music bridges the gap between classical Arabic maqams and modern sensibilities.",
      stat1: "Studio Albums",
      stat2: "Years of Legacy"
    },
    AR: {
      tag: "فنان أيقوني",
      tagSub: "جوهر السلطان",
      title: "إرث عابر للزمان",
      p1: "ولد في كفرون بسوريا، بدأ جورج وسوف رحلته في سن مبكرة، وسرعان ما أصبح اسماً مألوفاً في جميع أنحاء العالم العربي. صوته الفريد، المليء بالمشاعر الخام والطرب الذي لا يضاهى، أكسبه لقب 'سلطان الطرب'.",
      p2: "مع أكثر من 30 ألبوماً ومئات الحفلات الموسيقية التي بيعت تذاكرها بالكامل عالمياً، أتقن الوسوف فن تصوير التجربة الإنسانية من خلال اللحن. جسدت موسيقاه الفجوة بين المقامات العربية الكلاسيكية والحساسيات الحديثة.",
      stat1: "ألبوم استوديو",
      stat2: "عام من العطاء"
    }
  }[lang];

  return (
    <section className="py-24 px-6 md:px-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-700 rounded-2xl" />
          <img 
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop" 
            alt="George Wassouf Portrait" 
            className="relative z-10 w-full rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 object-cover h-[600px]"
          />
          <div className={`absolute bottom-8 ${isRtl ? 'right-8' : 'left-8'} z-20 text-white`}>
            <p className="text-sm tracking-widest uppercase mb-2 opacity-60">{translations.tag}</p>
            <h3 className="text-3xl font-serif italic">{translations.tagSub}</h3>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">{translations.title.split(' ')[0]} <span className="text-gray-500 italic">{translations.title.split(' ').slice(1).join(' ')}</span></h2>
          <div className="w-20 h-1 bg-white" />
          
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
            <p>{translations.p1}</p>
            <p>{translations.p2}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div>
              <p className="text-3xl font-serif text-white">30+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">{translations.stat1}</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-white">40Y</p>
              <p className="text-xs uppercase tracking-widest text-gray-500">{translations.stat2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
