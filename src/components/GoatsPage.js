import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const GoatsPage = ({ currentLang, switchLanguage }) => {
  const [activeTab, setActiveTab] = useState('genetic');

  useEffect(() => {
    // Handle stats animations when component loads
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count') || '0');
          let current = 0;
          const increment = target / 50;
          const duration = 2000;
          const stepTime = duration / 50;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current).toString();
          }, stepTime);
        }
      });
    }, { threshold: 0.1 });

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const goatBreeds = [
    {
      name: {
        en: 'Jabal Akhdar Goat',
        ar: 'ماعز جبل أخضر'
      },
      image: '/images/arabic_image_63.png',
      description: {
        en: 'The Jabal Akhdar goat breed is characterized by its light brown or whitish color and large size. The body is covered with thick medium-length coat, and both males and females have long horns, though some individuals are hornless. This breed has a short tail and is the largest goat breed in Oman. Found primarily in the Interior Governorate and concentrated in the peaks of the Jabal Akhdar mountains, these goats are raised in medium to large herds by nomadic herders and in smaller numbers by settled farmers. Its production characteristics include an average birth weight of 3.5 kg, weaning weight of 14.5 kg, six-month weight of 23 kg, and mature weight of 35 kg. The breed has a fertility rate of 90% with a twinning rate of 128% and is primarily raised for meat production.',
        ar: 'يغلب على سلالة ماعز الجبل الأخضر اللون البني الفاتح أو المائل إلى البياض في بعض الأحيان وتعتبر هذه السلالة كبيرة الحجم ويكسو جسمها شعر كثيف ومتوسط الطول ولديها قرون طويلة في الإناث والذكور وأحيانا توجد حيوانات بدون قرون ولها ذيل قصير. توجد في محافظة الداخلية وتتركز في قمم الجبل الأخضر. تُربى هذه الماعز عمومًا في قطعان متوسطة إلى كبيرة يتراوح عددها بين 50 و300 رأس، بينما يمتلك المزارعون المستقرون في السهول الداخلية قطعانًا أصغر. تتميز بخصائص إنتاجية تشمل متوسط وزن الميلاد 3.5 كجم، ووزن الفطام 14.5 كجم، ووزن ستة أشهر 23 كجم، ومتوسط وزن الجسم الناضج 35 كجم. تبلغ نسبة الخصوبة 90% ونسبة التوأمية 128% وتربى بشكل رئيسي لإنتاج اللحم.'
      }
    },
    {
      name: {
        en: 'Batinah Goat',
        ar: 'ماعز الباطنة'
      },
      image: '/images/arabic_image_37.jpg',
      description: {
        en: 'The Batinah goat breed is characterized by its predominantly dark brown color with white areas on the face and lower legs. This medium-sized breed has large horns in both males and females, a short tail, and a medium-length coat covering its body. These goats are found in the mountainous regions between Al Batinah and Al Dhahirah Governorates, as well as in most northern regions of the Sultanate. Batinah goats are well-adapted to the local environment and are raised primarily for meat production. The average birth weight is 3 kg, weaning weight is 14 kg, and mature weight reaches 33 kg. The breed has an impressive fertility rate of 92% with a twinning rate of 130%.',
        ar: 'يغلب على ماعز الباطنة اللون البني الغامق مع وجود منطقة بيضاء في الوجه وأسفل الساق وهذه السلالة متوسطة الحجم ولديها قرون كبيرة في الذكور والإناث وذيل قصير الطول كما يغطى الجسم بشعر متوسط الطول. توجد حول المناطق الجبلية الواقعة بين محافظتي الباطنة والظاهرة، كما توجد في معظم المناطق الشمالية للسلطنة. تتربى هذه السلالة وفق نظام تربية متوسط المدخلات وتربى بشكل رئيسي لإنتاج اللحم. يبلغ متوسط وزن المواليد عند الميلاد 3 كجم، وعند الفطام 14 كجم، ومتوسط وزن الجسم الناضج 33 كجم. تتميز بنسبة خصوبة مرتفعة تبلغ 92% ونسبة توأمية 130%.'
      }
    },
    {
      name: {
        en: 'Dhofari Goat',
        ar: 'ماعز ظفار'
      },
      image: '/images/arabic_image_19.png',
      description: {
        en: 'The Dhofari goat breed is characterized by its predominantly white color, though other colors like dark brown, light brown, black, or mottled combinations are also found. This breed is smaller in size compared to other local goat breeds, with a body covered in short, fine coat. Both males and females have horns that slope backward, small ears, and a short, upturned tail. These goats are found in the plains (Salalah plain and Najd) and mountainous areas of Dhofar Governorate. They are known for their abundant milk production, with some individuals producing more than 2 kg of milk daily, as well as their resistance to endemic diseases in the region. The average birth weight is 3.2 kg, weaning weight is 12 kg, six-month weight is 16 kg, and mature weight reaches 26 kg. The fertility rate is 82% with a twinning rate of 121%. This breed is raised for both meat and milk production.',
        ar: 'يغلب على ماعز ظفار اللون الأبيض وعادة ما توجد بعض الألوان الأخرى مثل البني الغامق والبني الفاتح والأسود او خليط من هذه الألوان. تتميز هذه السلالة بصغر حجمها مقارنة بسلالات الماعز المحلية الأخرى ويكسو جسمها شعر قصير وناعم وتوجد القرون في الذكور والإناث والقوائم قصيرة ورفيعة والذيل طويل ومنتصب إلى الأعلى. توجد في السهول (سهل صلالة والنجد) والمناطق الجبلية من محافظة ظفار. تتميز بغزارة إنتاج الحليب حيث قد يصل متوسط الإنتاج اليومي من الحليب في بعض الأفراد إلى أكثر من 2 كجم إضافة إلى مقاومتها للأمراض المستوطنة بالمنطقة وتحمل الظروف البيئية المحلية. يبلغ متوسط وزن المواليد عند الميلاد 3.2 كجم، وعند الفطام 12 كجم، وعند ستة أشهر 16 كجم، ومتوسط وزن الجسم الناضج 26 كجم. تبلغ نسبة الخصوبة 82% ونسبة التوأمية 121%. تربى هذه السلالة لإنتاج اللحم والحليب.'
      }
    },
    {
      name: {
        en: 'Sahrawi Goat',
        ar: 'ماعز صحراوي'
      },
      image: '/images/66.png',
      description: {
        en: 'The Sahrawi goat is characterized by its small to medium size and deep black color. It has a small head with horns in most individuals (though some hornless variants called "Jalhaa" exist), a slightly long neck, and ears that vary in length within the breed. These goats are found along the borders of the Empty Quarter and Eastern Sands, primarily in the wilayats of Bidiya, Al Kamil and Al Wafi, Jaalan Bani Bu Ali, Jaalan Bani Bu Hassan, and Sur. They are also found in Al Dhahirah and Musandam Governorates. Known for their remarkable heat tolerance, they have evolved to survive in extremely arid conditions with minimal water and sparse vegetation. The average birth weight is 2.5 kg, weaning weight is 13 kg, and mature weight reaches 27 kg. The fertility rate is 85% with a twinning rate of 125%. This breed is raised for both meat and milk production.',
        ar: 'تتميز الماعز الصحراوي بحجمها الصغير إلى المتوسط، ولونها الأسود القاتم. الرأس صغير الحجم وبه قرون في معظم الجنسين (وتوجد بعض العترات عديمة القرون وتسمى الجلحى). الرقبة بها نسبة بسيطة من الطول، الأذنين تختلف أطوالها داخل السلالة فمنها الصغيرة ومنها متوسطة الطول وقوية. توجد عند حدود الربع الخالي ورمال الشرقية وتوجد بصورة رئيسية في ولايات بدية والكامل والوافي وجعلان بنو علي وجعلان بني بو حسن وصور. كما توجد في محافظة الظاهرة ومسندم. تشتهر بتحملها الرائع للحرارة، وقد تطورت للبقاء على قيد الحياة في ظروف قاحلة للغاية مع الحد الأدنى من الماء والنباتات النادرة. يبلغ متوسط وزن المواليد عند الميلاد 2.5 كجم، وعند الفطام 13 كجم، ومتوسط وزن الجسم الناضج 27 كجم. تبلغ نسبة الخصوبة 85% ونسبة التوأمية 125%. تربى هذه السلالة لإنتاج اللحم والحليب.'
      }
    },
    {
      name: {
        en: 'Sahrawi Musandam Goat',
        ar: 'ماعز صحراوي مسندم'
      },
      image: '/images/65.png',
      description: {
        en: 'Sahrawi Musandam Goat is characterized by its black hair with brown stripes around the neck, belly, and legs. It is smaller than Sahrawi Goats and is found primarily in the Musandam Governorate, which is characterized by its mountainous terrain. Male offspring weigh an average of 2.63 kg at birth, 14.48 kg at weaning, and an average body weight of 22.41 kg at six months.',
        ar: 'يتميز ماعز صحراوي مسندم بشعره الأسود مع خطوط بنية حول الرقبة والبطن والأرجل. وهي أصغر حجمًا مقارنة بالماعز الصحراوي، ويتواجد بشكل رئيسي في محافظة مسندم والتي تتميز بتضاريسها الجبلية. يبلغ متوسط وزن المواليد الذكور عند الميلاد 2.63 كجم وعند الفطام 14.48 كجم ومتوسط وزن الجسم ستة أشهر 22.41 كجم'
      }
    },
    {
      name: {
        en: 'Jebali Goat',
        ar: 'ماعز جبالي'
      },
      image: '/images/arabic_image_64.png',
      description: {
        en: 'The Jebali goat is a large-sized breed with colors ranging from light brown to dark brown and reddish-brown, with some having white spots on their legs and head. This breed has a relatively large head, a convex nose, and short ears. Horns are present in most males and females, curving backward, and the tail is short and raised upward. These goats are found along the borders of the Eastern Hajar Mountain range (Ibra, Al Mudhaibi, Al Qabil, Dima Wa Al Tayeen, and Quriyat), as well as in the Western Hajar range, especially in Al Dhahirah Governorate. The average birth weight is 3.3 kg, weaning weight is 16 kg, and the average mature body weight is 30 kg. The fertility rate is 85% with a twinning rate of 120%. This breed is primarily raised for meat production.',
        ar: 'هي من السلالات كبيرة الحجم، ويميل لونها للبني الفاتح والبني الغامق والبني المحمر ويوجد في البعض منها بقع بيضاء على أرجلها ورأسها. يعتبر رأس هذه السلالة كبير الحجم نسبيا، والأنف محدبة الشكل، والأذنين قصيرتين، كما أن القرون موجودة في معظم الذكور والإناث ومنحنية للخلف والذيل قصير ومرتفع للأعلى. توجد في حدود سلسلة جبال الحجر الشرقي (إبراء، المضيبي، القابل، دماء والطائيين و قريات)، كما تتواجد في سلسة الحجر الغربي وخصوصا في محافظة الظاهرة. متوسط وزن المواليد الجبالي عند الميلاد 3.3 كجم وعند الفطام 16 كجم و متوسط وزن الجسم الناضج 30 كجم. نسبة الخصوبة 85% ونسبة التوأمية 120%. غرض التربية هو إنتاج اللحم.'
      }
    }
  ];

  const conservationTimeline = [
    {
      title: {
        en: 'Genetic Characterization',
        ar: 'التوصيف الجيني'
      },
      content: {
        en: 'Comprehensive genetic studies to document and analyze the unique traits of Omani goat breeds.',
        ar: 'دراسات جينية شاملة لتوثيق وتحليل السمات الفريدة لسلالات الماعز العمانية.'
      }
    },
    {
      title: {
        en: 'Breeding Programs',
        ar: 'برامج التربية'
      },
      content: {
        en: 'Selective breeding programs to maintain genetic purity while enhancing productivity.',
        ar: 'برامج التربية الانتقائية للحفاظ على النقاء الجيني مع تعزيز الإنتاجية.'
      }
    },
    {
      title: {
        en: 'Farmer Education',
        ar: 'تثقيف المزارعين'
      },
      content: {
        en: 'Training programs for local farmers on best practices for maintaining indigenous breeds.',
        ar: 'برامج تدريبية للمزارعين المحليين حول أفضل الممارسات للحفاظ على السلالات المحلية.'
      }
    },
    {
      title: {
        en: 'Livestock Breeder Support',
        ar: 'دعم مربي الماشية'
      },
      content: {
        en: 'Distributing improved bucks of various goat breeds to breeders for the genetic improvement of their herds.',
        ar: 'توزيع ذكور محسنة من مختلف سلالات الماعز على المربيين لتحسن نسل قطعانهم'
      }
    }
  ];

  return (
    <div>
      {/* Language Switcher */}
      <div className="language-switcher">
        <button 
          className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
          onClick={() => switchLanguage('en')}
        >
          English
        </button>
        <button 
          className={`lang-btn ${currentLang === 'ar' ? 'active' : ''}`}
          onClick={() => switchLanguage('ar')}
        >
          العربية
        </button>
      </div>

      {/* Header */}
    <Header currentLang={currentLang} />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(245, 240, 230, 0.1)), url(/images/banner_3.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <h1 className={`hero-title ${currentLang}`}>
            {currentLang === 'en' ? 'Omani Goat Breeds' : 'سلالات الماعز العمانية'}
          </h1>
          <p className={`hero-subtitle ${currentLang}`}>
            {currentLang === 'en' ? 
              'Discover the unique indigenous goat breeds of Oman' :
              'اكتشف سلالات الماعز المحلية الفريدة في عمان'
            }
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Indigenous Goat Breeds of Oman' : 'سلالات الماعز المحلية في سلطنة عمان'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Oman has six genetically distinct indigenous goat breeds adapted to different regions' :
                'تمتلك عمان ست سلالات متميزة وراثيًا من الماعز المحلية متكيفة مع المناطق المختلفة'
              }
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'The Sultanate of Oman is home to six genetically distinct indigenous goat breeds that have adapted to the country\'s challenging environmental conditions over centuries. These breeds play vital roles in food security, rural livelihoods, and cultural heritage. Omani indigenous goats are highly valued for their ability to thrive in harsh arid environments, their resistance to local diseases, and their production of meat and milk under challenging conditions.' :
                  'تعد سلطنة عمان موطنًا لست سلالات متميزة وراثيًا من الماعز المحلية التي تكيفت مع الظروف البيئية الصعبة في البلاد على مر القرون. تلعب هذه السلالات أدوارًا حيوية في الأمن الغذائي وسبل العيش الريفية والتراث الثقافي. يحظى الماعز العماني المحلي بتقدير كبير لقدرته على الازدهار في البيئات القاحلة القاسية ومقاومته للأمراض المحلية وإنتاجه للحوم والحليب في ظل الظروف الصعبة.'
                }
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number" data-count="6">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Indigenous Goat Breeds' : 'سلالات الماعز المحلية'}
                  </div>
                </div>
               
              </div>
            </div>
            <div className="about-image">
              <img src="/images/arabic_image_51.png" alt="Omani Goats" className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section id="resources" className="resources">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Goat Breeds' : 'سلالات الماعز في سلطنة عمان'}
            </h2>
          </div>
          <div className="resources-grid">
            {goatBreeds.map((breed, index) => (
              <div key={index} className="resource-card">
                <div className="card-image">
                  <img src={breed.image} alt={breed.name[currentLang]} />
                </div>
                <div className="card-content">
                  <h3 className={`card-title ${currentLang}`}>{breed.name[currentLang]}</h3>
                  <p className={`card-description ${currentLang}`}>{breed.description[currentLang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Section */}
      <section id="goat-conservation" className="conservation">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Conservation Efforts' : 'جهود الحفاظ'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 'Protecting Oman\'s valuable goat genetic resources' : 'حماية الموارد الوراثية القيمة للماعز في عمان'}
            </p>
          </div>
          <div className="conservation-content">
            <div className="timeline">
              {conservationTimeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h3 className={currentLang}>{item.title[currentLang]}</h3>
                    <p className={currentLang}>{item.content[currentLang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="research">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Research & Development' : 'البحث والتطوير'}
            </h2>
          </div>
          <div className="tabs-container">
            <div className="tabs">
              <button 
                className={`tab-btn ${activeTab === 'genetic' ? 'active' : ''}`} 
                onClick={() => setActiveTab('genetic')}
              >
                <span className={currentLang}>
                  {currentLang === 'en' ? 'Genetic Studies' : 'الدراسات الجينية'}
                </span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'productivity' ? 'active' : ''}`}
                onClick={() => setActiveTab('productivity')}
              >
                <span className={currentLang}>
                  {currentLang === 'en' ? 'Productivity Enhancement' : 'تعزيز الإنتاجية'}
                </span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'disease' ? 'active' : ''}`}
                onClick={() => setActiveTab('disease')}
              >
                <span className={currentLang}>
                  {currentLang === 'en' ? 'Disease Resistance' : 'مقاومة الأمراض'}
                </span>
              </button>
            </div>
            <div className="tab-content">
              <div className={`tab-pane ${activeTab === 'genetic' ? 'active' : ''}`}>
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Genetic Diversity Studies' : 'دراسات التنوع الجيني'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research has shown that the six local goat breeds in Oman are genetically distinct, with significant diversity among them. DNA markers and genetic studies have been used to assess their genetic diversity and population structure. These studies aid in designing conservation programs, managing breeding strategies, and identifying unique genetic traits that may be valuable for future breeding efforts.' :
                        'أظهرت الأبحاث أن سلالات الماعز المحلية الست في عمان متميزة وراثيًا مع تنوع كبير بينها. تم استخدام علامات الحمض النووي والدراسات الجينية لتقييم تنوعها الجيني وهيكلية القطعان. تساعد هذه الدراسات في تصميم برامج الحفاظ، وإدارة استراتيجيات التربية، وتحديد السمات الجينية الفريدة التي قد تكون قيمة لجهود التربية المستقبلية.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/arabic_image_40.png" alt="Genetic Research" />
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === 'productivity' ? 'active' : ''}`}>
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Improving Milk and Meat Production' : 'تحسين إنتاج الحليب واللحوم'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Studies are focused on improving the productivity of indigenous goat breeds through enhanced nutrition, management practices, and health care while preserving their unique adaptive traits. These efforts aim to increase milk and meat production under challenging environmental conditions without compromising the breeds\' natural resilience to harsh climates and local diseases.' :
                        'تركز الدراسات على تحسين إنتاجية سلالات الماعز المحلية من خلال تحسين التغذية وممارسات الإدارة والرعاية الصحية مع الحفاظ على سماتها التكيفية الفريدة. تهدف هذه الجهود إلى زيادة إنتاج الحليب واللحوم في ظل الظروف البيئية الصعبة دون المساس بالمرونة الطبيعية للسلالات تجاه المناخات القاسية والأمراض المحلية.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/goat_resistance.jpg" alt="Productivity Research" />
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === 'disease' ? 'active' : ''}`}>
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Disease Resistance Mechanisms' : 'آليات مقاومة الأمراض'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research is being conducted to understand the genetic basis of disease resistance in Omani goat breeds. These indigenous breeds have developed natural resistance to various local parasites and diseases over centuries of adaptation. Identifying the genes responsible for this resistance could help in developing more resilient goat populations globally and contribute to sustainable livestock production in challenging environments.' :
                        'يتم إجراء البحوث لفهم الأساس الجيني لمقاومة الأمراض في سلالات الماعز العمانية. طورت هذه السلالات المحلية مقاومة طبيعية لمختلف الطفيليات والأمراض المحلية على مدى قرون من التكيف. يمكن أن يساعد تحديد الجينات المسؤولة عن هذه المقاومة في تطوير مجموعات ماعز أكثر مرونة على مستوى العالم والمساهمة في إنتاج مستدام للماشية في البيئات الصعبة.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/goat_health.jpeg" alt="Disease Resistance Research" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/images/arabic_image_0.jpg" alt="Logo" className="footer-logo-img" />
              <div className="footer-logo-text">
                <h3 className={currentLang}>Livestock Research Center</h3>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h4 className={currentLang}>
                  {currentLang === 'en' ? 'Quick Links' : 'روابط سريعة'}
                </h4>
                <ul>
                  <li><Link to="/">
                    {currentLang === 'en' ? 'Home' : 'الرئيسية'}
                  </Link></li>
                  <li><a href="#about">
                    {currentLang === 'en' ? 'About' : 'نبذة عامة'}
                  </a></li>
                  <li><a href="#resources">
                    {currentLang === 'en' ? 'Resources' : 'الموارد'}
                  </a></li>
                  <li><a href="#goat-conservation">
                    {currentLang === 'en' ? 'Conservation' : 'جهود الحفاظ'}
                  </a></li>
                </ul>
              </div>
              <div className="footer-links-column">
                <h4 className={currentLang}>
                  {currentLang === 'en' ? 'Resources' : 'الموارد'}
                </h4>
                <ul>
                  <li><Link to="/cattle">
                    {currentLang === 'en' ? 'Cattle' : 'الأبقار'}
                  </Link></li>
                  <li><Link to="/goats">
                    {currentLang === 'en' ? 'Goats' : 'الماعز'}
                  </Link></li>
                  <li><Link to="/sheep">
                    {currentLang === 'en' ? 'Sheep' : 'الأغنام'}
                  </Link></li>
                  <li><Link to="/camels">
                    {currentLang === 'en' ? 'Camels' : 'الإبل'}
                  </Link></li>
                  <li><Link to="/poultry">
                    {currentLang === 'en' ? 'Poultry' : 'الدواجن'}
                  </Link></li>
                </ul>
              </div>
            </div>
            {/* <div className="footer-social">
              <h4 className={currentLang}>
                {currentLang === 'en' ? 'Follow Us' : 'تابعنا'}
              </h4>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div> */}
          </div>
          <div className="footer-bottom">
          <p className={`copyright ${currentLang}`}>© 2025 Livestock Research Center. All Rights Reserved. Yasir Obaid Thani Al-Shukaili</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GoatsPage;
