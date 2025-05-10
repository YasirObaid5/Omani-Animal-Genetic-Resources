import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import translations from '../scripts/translations.json';
import Header from './Header';
import Footer from './Footer';

const CamelsPage = ({ currentLang, switchLanguage }) => {
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
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/racing_camel.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)', 
            padding: '20px 30px',
            borderRadius: '8px',
            backdropFilter: 'blur(2px)',
            margin: '0 auto 20px auto',
            maxWidth: '90%'
          }}>
            <h1 className={`hero-title ${currentLang}`}>
              {currentLang === 'en' ? 'Omani Camel Types' : 'أنواع الأبل العمانية'}
            </h1>
            <p className={`hero-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Discover the majestic Arabian camels and their unique strains in Oman' :
                'اكتشف الإبل العربية وأنواعها الفريدة في سلطنة عمان'
              }
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <a href="#resources" className={`cta-button ${currentLang}`}>
              {currentLang === 'en' ? 'Explore Resources' : 'استكشف الموارد'}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Arabian Camels in Oman' : 'الإبل العربية في سلطنة عمان'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'The iconic single-humped dromedary camel with diverse regional strains that reflect Oman\'s cultural heritage' :
                'الجمل العربي الشهير ذو السنام الواحد مع تباينات في الألوان والحجام تعكس التنوع الجغرافي والتراث الثقافي العماني'
              }
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  ' The camel population in Oman consists entirely of the Arabian one-humped dromedary (Camelus dromedarius), an animal that has been intimately tied to Omani culture and society for thousands of years. While all Omani camels belong to the same species, several local strains or types have developed over centuries of selective breeding and environmental adaptation. These strains vary in color, size, temperament, and performance characteristics, reflecting the diverse landscapes of the Sultanate. Traditionally, camels served as the primary means of transport, provided milk and meat, and were essential for survival in the harsh desert environment. Today, they continue to hold deep cultural significance and are central to various festivals and sporting events, particularly camel racing, which has become a prominent modern tradition in Oman.' :
                  'يتكون قطيع الإبل في عُمان بالكامل من الجمل العربي ذي السنام الواحد (الجمل الوحيد السنام - Camelus dromedarius)، وهو حيوان ارتبط ارتباطًا وثيقًا بالثقافة والمجتمع العُماني لآلاف السنين. وعلى الرغم من أن جميع الإبل العُمانية تنتمي إلى نفس السلالة، فقد تطورت العديد من الأنواع المحلية على مر قرون من التربية الانتقائية والتكيف البيئي. تختلف هذه الأنواع في اللون والحجم والمزاج وخصائص الأداء، مما يعكس التنوع الطبيعي في السلطنة. تقليديًا، كانت الإبل تُعد وسيلة النقل الأساسية، ومصدرًا للحليب واللحوم، وكانت ضرورية للبقاء على قيد الحياة في البيئة الصحراوية القاسية. أما اليوم، فلا تزال تحتفظ بأهمية ثقافية عميقة وتُعتبر جزءًا أساسيًا في مختلف المهرجانات والفعاليات الرياضية، لا سيما سباقات الهجن، التي أصبحت تقليدًا حديثًا بارزًا في عُمان.'
                }
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number" data-count="2">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Classification according to their geographical regions' :'تصنيف الأبل العمانية حسب مناطقها الجغرافية'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-count="3">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Classification according to their uses' : 'تصنيفها حسب الاستخدامات'}
                  </div>
                </div>
                {/* <div className="stat-item">
                  <div className="stat-number" data-count="100">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Years of Adaptation' : 'سنوات من التكيف'}
                  </div>
                </div> */}
              </div>
            </div>
            <div className="about-image">
              <img src="/images/camel5.png" alt="Omani Camel" className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="resources">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Omani Camel Types' :' أنواع الأبل العمانية'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'They are divided according to their geographical areas and uses.' :
                'وتقسم حسب مناطقها الجغرافية واستخدامتها'
              }
            </p>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/camel0.png" alt="North Oman Camel" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Northern Omani Camel' : 'إبل شمال سلطنة عمان'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    ' The Northern Omani camels are predominantly found in the northern governorates of the Sultanate. These camels are generally characterized by lighter coat colors, ranging from light brown to cream, and exhibit strong endurance traits that make them well-suited for travel across long distances. They are known for their remarkable adaptability to the harsh desert climate, particularly in the interior regions of Al Dakhiliyah and Al Dhahirah. Traditionally, these camels were preferred for transportation across the vast desert expanses and continue to be valued for their resilience in racing events. Their genetic makeup shows adaptation to the sandy deserts and rocky terrain of northern Oman.' :
                    ' تتواجد إبل شمال عمان بشكل رئيسي في المحافظات الشمالية للسلطنة. تتميز هذه الإبل عموماً بألوان الشعر الفاتحة، تتراوح من البني الفاتح إلى الكريمي، وتظهر صفات قوة التحمل التي تجعلها مناسبة تماماً للسفر عبر المسافات الطويلة. إنها معروفة بقدرتها الملحوظة على التكيف مع مناخ الصحراء القاسي، خاصة في المناطق الداخلية لمحافظتي الداخلية والظاهرة. تقليدياً، كانت هذه الإبل مفضلة للنقل عبر الصحاري الشاسعة وتظل ذات قيمة لقدرتها على الصمود في أحداث السباقات. يُظهر تركيبها الجيني التكيف مع الصحاري الرملية والتضاريس الصخرية في شمال عمان.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/DhofarCamel.png" alt="Al-Batinah Cattle" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Omani Southern Camel' : 'إبل جنوب عمان'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Southern Omani camels, primarily found in the Dhofar Governorate, represent a distinct population adapted to the unique climate of southern Oman. These camels often display darker coloration compared to their northern counterparts and show specific adaptations to the monsoon-influenced environment of Dhofar. They are particularly well-suited to the mixture of coastal plains and mountainous terrain, as well as the higher humidity levels experienced during the khareef season. Southern Omani camels are valued for their milk production capabilities and their ability to thrive in the more diverse landscape of Dhofar. They play significant roles in local communities, particularly in milk production for both domestic use and traditional medicinal purposes.' :
                    'تمثل إبل جنوب عمان، الموجودة بشكل رئيسي في محافظة ظفار، مجموعة متميزة متكيفة مع المناخ الفريد لجنوب عمان. غالباً ما تظهر هذه الإبل ألواناً أغمق مقارنة بنظيراتها الشمالية وتظهر تكيفات محددة مع بيئة ظفار المتأثرة بالرياح الموسمية. إنها مناسبة بشكل خاص لمزيج من السهول الساحلية والتضاريس الجبلية، بالإضافة إلى مستويات الرطوبة الأعلى التي تُختبر خلال موسم الخريف. تُقدَّر إبل جنوب عمان لقدراتها الإنتاجية في الحليب وقدرتها على الازدهار في المناظر الطبيعية الأكثر تنوعاً في ظفار. تلعب أدواراً مهمة في المجتمعات المحلية، خاصة في إنتاج الحليب للاستخدام المنزلي والأغراض الطبية التقليدية.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/milk_camel.jpg" alt="Milk Camel" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Milk Production Camel' :'إبل الحليب'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'Roughly 60% of Oman’s camels are found in the southern region, where they are primarily raised for milk production and display a distinctive coat color compared to their northern counterparts. These dairy‐type camels graze freely with ample access to pasture and water, a management style that supports higher lactation yields. Breeders in the south focus on milk output, and special regional competitions are held to recognize the most productive individuals.' :
                    'يتركز نحو 60٪ من مجموع إبل عُمان في المنطقة الجنوبية، حيث تُربى أساسًا لإنتاج الحليب وتتميز بلون فرو مغاير لأنواع الشمال. تعيش هذه الإبل ضمن نظام رعي حر مع توفر كافٍ للمراعي والمياه، مما يدعم ارتفاع إنتاج الحليب. يركّز المربون في الجنوب على إنتاجية الحليب، ويُقام في هذه المنطقة مسابقات خاصة لاختيار أفضل المنتجين.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/racing_camel.jpg" alt="Racing Camel" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Racing Camels' :'إبل السباق'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'Racing camels in Oman represent a specialized strain selectively bred for speed and agility. These animals typically exhibit longer legs, leaner bodies, and lighter coloration than traditional camels. They are bred from the best racing bloodlines and undergo intensive training from a young age. Racing camels are prized not only for their athletic abilities but also for their cultural significance in modern Oman, where camel racing has evolved into a prestigious sport. The racing strain combines physical attributes that optimize speed with maintaining the hardiness required to compete in the desert environment. These camels often command premium prices and receive specialized care and nutrition programs.' :
                    'تُمثل إبل السباق في عُمان سلالة متخصصة مُهجّنة ومنتخبة للسرعة وخفة الحركة. تتميز هذه الحيوانات عادةً بأرجل أطول، وأجسام أنحف، ولون أفتح من الجمال التقليدية. تُربى هذه الجمال من أعرق سلالات السباق، وتخضع لتدريب مكثف منذ الصغر. تُقدّر إبل السباق ليس فقط لقدراتها الرياضية، بل أيضًا لأهميتها الثقافية في عُمان الحديثة، حيث تطور سباق الهجن ليصبح رياضة مرموقة. تجمع سلالة السباق بين السمات البدنية التي تُحسّن السرعة مع الحفاظ على القدرة على التحمل اللازمة للمنافسة في البيئة الصحراوية. غالبًا ما تُباع هذه الجمال بأسعار مميزة، وتتلقى رعاية وتغذية متخصصة.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/beauty_camel.jpg" alt="Beauty Camel" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Beauty Camels' :'إبل المزاينة'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Mozaina, or “beauty” camel, represents the ideal Omani conformation, distinguished by its long legs, slender neck, medium-sized head with a prominent nose, elongated ears, sweeping eyelashes and characteristic pendulous lip. Native to the semi-grazed herds of northern Oman—particularly the Batinah region—these animals are selectively bred and maintained primarily for aesthetic competitions. During such events, only purebred Omani camels are eligible and are evaluated by expert judges who assign scores to each defining trait; those failing to meet the strict morphological criteria are excluded from contention.' :
                    'إبل المُزاينة تجسد الهيئة العُمانية المثالية، وتتميز بأرجل طويلة ورقبة نحيلة ورأس متوسط الحجم بآفة بارزة وأذنين طويلتين ورموشٍ كثيفة وشفةٍ سفلية مترهلة. تنحدر هذه الإبل من قطعان الشمال العُماني شبه المُرعَاة، وخاصة في منطقة الباطنة، حيث تُربى وتُعتنى بها أساساً لأجل مسابقات الجمال. في هذه الفعاليات، يحقّ للمشاركة فقط للإبل العُمانية الأصيلة، ويقوم خبراء التحكيم بتقييمها ومنح النقاط لكل صفة مميزة، بينما تُستبعد الإبل التي لا تستوفي المعايير الشكلية الصارمة من التنافس'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Section */}
<section id="conservation" className="conservation">
  <div className="container">
    <div className="section-header">
      <h2 className={`section-title ${currentLang}`}>
        {currentLang === 'en' ? 'Conservation Efforts' : 'جهود الحفاظ'}
      </h2>
      <p className={`section-subtitle ${currentLang}`}>
        {currentLang === 'en' ? 'Preserving Oman\'s valuable camel genetic resources' : 'الحفاظ على الموارد الوراثية القيمة للإبل في عمان'}
      </p>
    </div>
    <div className="conservation-content">
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3 className={currentLang}>
              {currentLang === 'en' ? 'Royal Patronage' : 'الرعاية السلطانية'}
            </h3>
            <p className={currentLang}>
              {currentLang === 'en' ? 
                'Under the Royal patronage, represented by the Royal Court Affairs, new directives concerning the breeding and care of Omani camel breeds have been implemented' :
                'تحت الرعاية السلطانية ممثلة بشؤون البلاط السلطاني، تم تنفيذ توجيهات جديدة تتعلق بتربية ورعاية سلالات الإبل العمانية.'
              }
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3 className={currentLang}>
              {currentLang === 'en' ? 'Breeding Programs' : 'برامج التربية'}
            </h3>
            <p className={currentLang}>
              {currentLang === 'en' ? 
                'Comprehensive breeding programs have been established to maintain genetic purity and preserve the distinct characteristics of each camel strain.' :
                'تم إنشاء برامج تربية شاملة للحفاظ على النقاء الوراثي والحفاظ على الخصائص المميزة لأنواع الإبل.'
              }
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3 className={currentLang}>
              {currentLang === 'en' ? 'Crossbreeding Regulations' : 'لوائح التهجين'}
            </h3>
            <p className={currentLang}>
              {currentLang === 'en' ? 
                'To preserve lineage purity, crossbreeding regulations have been implemented to maintain the authentic characteristics of Omani camel strains.' :
                'للحفاظ على نقاء النسب، تم تنفيذ لوائح التهجين للحفاظ على الخصائص الأصيلة لسلالة الإبل العمانية.'
              }
            </p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3 className={currentLang}>
              {currentLang === 'en' ? 'Cultural Heritage' : 'التراث الثقافي'}
            </h3>
            <p className={currentLang}>
              {currentLang === 'en' ? 
                'Programs to document traditional knowledge about camel breeding practices and promoting camel racing and festivals as part of Oman\'s cultural heritage.' :
                'برامج لتوثيق المعرفة التقليدية حول ممارسات تربية الإبل و تعزيز سباقات الهجن والمهرجانات كجزء من التراث الثقافي العماني.'
              }
            </p>
          </div>
        </div>
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
        <div className={`tab-pane ${activeTab === 'genetic' ? 'active' : ''}`} id="genetic">
          <div className="tab-pane-content">
            <div className="tab-text">
              <h3 className={currentLang}>
                {currentLang === 'en' ? 'Genetic Characterization Studies' : 'دراسات التوصيف الجيني'}
              </h3>
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'Scientific research is being conducted to document and analyze the genetic makeup of Oman\'s camel strains. These studies aim to identify unique genetic markers specific to each strain and understand the genetic relationships between different camel populations. The research provides valuable information for conservation programs and helps maintain the genetic diversity of Omani camels. Modern genomic technologies are being employed to map the complete genetic profile of these important livestock resources.' :
                  'يتم إجراء بحث علمي لتوثيق وتحليل التركيب الجيني لأنواع الإبل في عمان. تهدف هذه الدراسات إلى تحديد العلامات الجينية الفريدة الخاصة بكل سلالة وفهم العلاقات الوراثية بين مجموعات الإبل المختلفة. توفر الأبحاث معلومات قيمة لبرامج الحفظ وتساعد في الحفاظ على التنوع الجيني للإبل العمانية. يتم استخدام تقنيات الجينوم الحديثة لرسم خريطة كاملة للملف الجيني لهذه الموارد الحيوانية المهمة.'
                }
              </p>
            </div>
            <div className="tab-image">
              <img src="/images/camel_gene.png" alt="Genetic Research" />
            </div>
          </div>
        </div>
        <div className={`tab-pane ${activeTab === 'productivity' ? 'active' : ''}`} id="productivity">
          <div className="tab-pane-content">
            <div className="tab-text">
              <h3 className={currentLang}>
                {currentLang === 'en' ? 'Improving Milk and Meat Production' : 'تحسين إنتاج الحليب واللحوم'}
              </h3>
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'Research initiatives are focused on enhancing the productivity of Omani camel breeds while preserving their unique adaptive traits. Studies are being conducted on improving milk yield and quality through optimized nutrition and management practices. Additionally, researchers are working on enhancing meat production characteristics without compromising the breeds\' natural adaptations to Oman\'s harsh climate. These efforts aim to increase the economic value of camel farming while maintaining the genetic integrity of these valuable indigenous resources.' :
                  'تركز مبادرات البحث على تعزيز إنتاجية أنواع الإبل العمانية مع الحفاظ على سماتها التكيفية الفريدة. يتم إجراء دراسات حول تحسين إنتاج الحليب وجودته من خلال التغذية المحسنة وممارسات الإدارة. بالإضافة إلى ذلك، يعمل الباحثون على تعزيز خصائص إنتاج اللحوم دون المساس بالتكيفات الطبيعية للأنواع المختلفة من الأبل مع مناخ عمان القاسي. تهدف هذه الجهود إلى زيادة القيمة الاقتصادية لتربية الإبل مع الحفاظ على السلامة الوراثية لهذه الموارد المحلية القيمة.'
                }
              </p>
            </div>
            <div className="tab-image">
              <img src="/images/came_productivity.png" alt="Productivity Research" />
            </div>
          </div>
        </div>
        <div className={`tab-pane ${activeTab === 'disease' ? 'active' : ''}`} id="disease">
          <div className="tab-pane-content">
            <div className="tab-text">
              <h3 className={currentLang}>
                {currentLang === 'en' ? 'Disease Resistance Mechanisms' : 'آليات مقاومة الأمراض'}
              </h3>
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'Significant research is being conducted to understand the remarkable disease resistance capabilities of Omani camels. These animals have naturally developed resistance to various local diseases through centuries of adaptation to the region\'s environmental conditions. Scientific studies are investigating the genetic basis of this resistance and identifying specific immune mechanisms that could have broader applications in veterinary medicine. This research not only helps in maintaining healthy camel populations but may also contribute to developing improved disease management strategies for other livestock species.' :
                  'يتم إجراء أبحاث مهمة لفهم قدرات مقاومة الأمراض الرائعة لدى الإبل العمانية. طورت هذه الحيوانات بشكل طبيعي مقاومة لمختلف الأمراض المحلية عبر قرون من التكيف مع الظروف البيئية للمنطقة. تبحث الدراسات العلمية في الأساس الجيني لهذه المقاومة وتحديد آليات مناعية محددة يمكن أن يكون لها تطبيقات أوسع في الطب البيطري. لا يساعد هذا البحث فقط في الحفاظ على صحة مجموعات الإبل ولكن قد يساهم أيضًا في تطوير استراتيجيات محسنة لإدارة الأمراض للأنواع الأخرى من الماشية.'
                }
              </p>
            </div>
            <div className="tab-image">
              <img src="/images/camel4.png" alt="Disease Resistance Research" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
};

export default CamelsPage;
