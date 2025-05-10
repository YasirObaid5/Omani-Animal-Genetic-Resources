import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import translations from '../scripts/translations.json';
import Header from './Header';
import Footer from './Footer';

const CattlePage = ({ currentLang, switchLanguage }) => {
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

  // This ensures the component properly displays content for the current language
  useEffect(() => {
    // Get all language elements
    const currentLangElements = document.querySelectorAll(`.${currentLang}`);
    const otherLangElements = document.querySelectorAll(`.${currentLang === 'ar' ? 'en' : 'ar'}`);
    
    // Set correct display for current language elements
    currentLangElements.forEach(el => {
      if (el.tagName === 'SPAN' || el.tagName === 'A') {
        el.style.display = 'inline';
      } else {
        el.style.display = 'block';
      }
      
      // Apply language-specific styling
      if (currentLang === 'ar') {
        el.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
        el.style.direction = 'rtl';
        el.style.textAlign = el.classList.contains('hero-title') || el.classList.contains('hero-subtitle') ? 'center' : 'right';
      } else {
        el.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
        el.style.direction = 'ltr';
        el.style.textAlign = el.classList.contains('hero-title') || el.classList.contains('hero-subtitle') ? 'center' : 'left';
      }
    });
    
    // Hide other language elements
    otherLangElements.forEach(el => {
      el.style.display = 'none';
    });
  }, [currentLang]);

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
          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(245, 240, 230, 0.1)), url(/images/cattle_2.jpeg)',
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
              {currentLang === 'en' ? 'Omani Cattle Breeds' : 'سلالات الأبقار العمانية'}
            </h1>
            <p className={`hero-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Discover the unique indigenous cattle breeds of Oman' :
                'اكتشف سلالات الأبقار المحلية الفريدة في عمان'
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
              {currentLang === 'en' ? 'Indigenous Cattle Breeds of Oman' : 'سلالات الأبقار المحلية في سلطنة عمان'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Oman\'s two distinct cattle breeds represent centuries of adaptation to to diverse environments and terrains' :
                'تمثل سلالتا الأبقار المتميزتان في عمان قروناً من التكيف مع بيئات وتضاريس متنوعة'
              }
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'The Sultanate of Oman is home to two genetically distinct indigenous cattle breeds: the Northern Omani cattle (Al-Batinah) and the Southern Omani cattle (Dhofari). These remarkable breeds represent centuries of natural selection and adaptation to Oman\'s challenging environmental conditions, including extreme temperatures, arid conditions, and limited forage availability. Both breeds belong to the Bos indicus species, though genetic studies reveal interesting admixture with Bos taurus lineages of African and Near Eastern origin, which may explain their exceptional adaptability. These indigenous cattle are highly valued for their ability to thrive in harsh arid environments, their resistance to local diseases, and their reliable production of meat and milk under challenging conditions that would challenge imported breeds.' :
                  'تعد سلطنة عمان موطناً لسلالتين متميزتين وراثياً من الأبقار المحلية: أبقار شمال عمان (الباطنة) وأبقار جنوب عمان (الظفارية). تمثل هاتان السلالتان الرائعتان قروناً من الانتقاء الطبيعي والتكيف مع الظروف البيئية الصعبة في عمان، بما في ذلك درجات الحرارة القصوى والظروف القاحلة ومحدودية توفر الأعلاف. تنتمي كلتا السلالتين إلى فصيلة البوس إنديكوس، على الرغم من أن الدراسات الجينية تكشف عن خليط مثير للاهتمام مع سلالات البوس تاوروس من أصول أفريقية وشرق أوسطية، قد يفسر قدرتها الاستثنائية على التكيف. تحظى هذه الأبقار المحلية بتقدير كبير لقدرتها على الازدهار في البيئات القاحلة القاسية ومقاومتها للأمراض المحلية وإنتاجها الموثوق للحوم والحليب في ظل ظروف صعبة قد تكون تحدياً للسلالات المستوردة.'
                }
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number" data-count="2">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Indigenous Cattle Breeds' : 'سلالات الأبقار المحلية'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-count="11">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Genetic Markers Analyzed' : 'تحليل العلامات الجينية'}
                  </div>
                </div>            
              </div>
            </div>
            <div className="about-image">
              <img src="/images/arabic_image_9.png" alt="Omani Cattle" className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="resources">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Cattle Breeds' : 'سلالات الأبقار في سلطنة عمان'}
            </h2>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/arabic_image_12.png" alt="Al-Batinah Cattle" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Northern Omani cattle' : 'أبقار شمال سلطنة عمان'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Northern Omani cattle is a small breed native to the northern regions of the Sultanate. This Zebu cattle (Bos indicus) breed ranges in color from light to dark brown, with males typically having darker brown coloration. They have a distinctive straight back, a prominent hump, and loose skin folds hanging beneath the neck. The breed is characterized by a short neck, long straight face, medium-length ears, and medium-length horns in males while females have shorter horns. The udder is small with short teats. Raised in backyards and on small farms, these cattle are distributed throughout the northern governorates of Oman, with concentrations in Muscat governorate, North and South Al Sharqiyah, extensive parts of North and South Al Batinah, Al Dakhiliyah, Al Dhahirah, and Musandam governorates. They have a fertility rate of 71.1%, with mature cows weighing between 230-280 kg and producing an average of 3.21 kg of milk per day. What truly distinguishes Northern Omani cattle is their exceptional adaptation to the local environment. They have developed remarkable immunity to parasites and infectious diseases, in addition to their superior ability to withstand high temperatures and utilize locally available roughage, ensuring stable production even in the harshest environmental conditions. Conservation efforts to preserve and genetically improve this indigenous breed began in 2003 at the Animal Resources Research Center in Rumais, recognizing its importance as part of the Sultanate of Oman\'s valuable genetic resources.' :
                    'تُعد أبقار شمال سلطنة عمان من سلالات الزيبو (البوس إنديكوس) صغيرة الحجم وتستوطن المناطق الشمالية من السلطنة. يسود عليها اللون البني الفاتح ويتدرج إلى البني الداكن بالنسبة للإناث ويغلب اللون البني الداكن في الذكور. تتصف بصغر الحجم، خط الظهر مستقيم، لديها سنام وزوائد جلدية تتدلى تحت الرقبة، الرقبة قصيرة، الوجه طويل ومستقيم، الأذن متوسطة الطول والقرون متوسطة الطول في الذكور وقصيرة في الإناث، الضرع صغير والحلمات قصيرة. تنتشر تربيتها في الفناءات الخلفية للمنازل والمزارع الصغيرة، وتتوزع في المحافظات الشمالية للسلطنة، يتركز انتشارها في محافظة مسقط، محافظتي شمال وجنوب الشرقية وفي أجزاء واسعة من محافظتي شمال وجنوب الباطنة، كذلك في محافظة الداخلية ومحافظة الظاهرة بالإضافة إلى محافظة مسندم. تبلغ نسبة الخصوبة 71.1%، ويتراوح وزن البقرة الناضجة بين 230-280 كجم، بينما يبلغ متوسط إنتاج الحليب اليومي 3.21 كجم. ما يميز أبقار شمال السلطنة حقاً هو تكيفها الاستثنائي مع البيئة المحلية. فقد طورت مناعة ملحوظة ضد الطفيليات والأمراض المعدية، إضافة إلى قدرتها الفائقة على تحمل درجات الحرارة المرتفعة والاستفادة من الأعلاف الخشنة المتاحة محلياً، مما يضمن استقرار إنتاجيتها حتى في أقسى الظروف البيئية. انطلقت جهود المحافظة على هذه السلالة الأصيلة وتحسينها وراثياً في عام 2003 بمركز بحوث الثروة الحيوانية في الرميس، إدراكاً لأهميتها كجزء من الموارد الوراثية القيمة لسلطنة عمان.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/bull_2.png" alt="Dhofari Cattle" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Southern Omani cattle' : 'أبقار جنوب سلطنة عمان'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Southern Omani cattle breed (Dhofari cattle) is one of the most important cattle breeds in the Sultanate of Oman, constituting the majority of the cattle herds. This Zebu cattle (Bos indicus) breed is characterized by its large size and predominantly black and white coloration, with some cattle having dark brown color and a higher percentage of African strains. They have a medium-sized head with a straight profile, medium-length horns, and short erect ears. Their distribution is concentrated in the Dhofar Governorate, particularly in the mountainous areas. The Southern Omani cattle have an impressive fertility rate of 80%, with mature animals weighing between 300-350 kg and producing an average of 7.06 kg of milk per day. Studies conducted at the Salalah Livestock Research Station demonstrated the breed\'s outstanding production characteristics, with an average milk yield of 6.08 kg/day over a lactation period of 201 days; an age at first calving of 35.5 months; a calving interval of 14.4 months; a gestation period of 285 days; and a postpartum estrus period of 91.5 days. This high reproductive capacity indicates strong local adaptation, influenced by genetic and management factors, as well as the unique seasonal climate of Dhofar. Since 1990, a long-term program of genetic selection for this breed has been implemented to maintain it in its environment and genetically improve it at Salalah Station.' :
                    'تُعد سلالة أبقار جنوب عُمان (الأبقار الظفارية) من أهم سلالات الأبقار في سلطنة عُمان، حيث تُشكل غالبية قطعان الأبقار. تتميز هذه السلالة من أبقار الزيبو (البوس إنديكوس) بكبر حجمها ويغلب عليها اللون الأسود والأبيض، وتوجد أبقار ذات لون بني داكن وتزيد فيها نسبة العروق الإفريقية. الرأس متوسط الحجم ومستقيم المقطع، القرون متوسطة الطول، الأذنان قصيرتان ومنتصبتان. تتركز هذه السلالة في محافظة ظفار وتحديداً في المناطق الجبلية. تتمتع أبقار جنوب عمان بنسبة خصوبة مرتفعة تبلغ 80%، ويتراوح وزن الحيوان الناضج بين 300-350 كجم، بينما يبلغ متوسط إنتاج الحليب اليومي 7.06 كجم. وأظهرت الدراسات التي أُجريت في محطة أبحاث الثروة الحيوانية بصلالة خصائصها الإنتاجية المتميزة، حيث كان متوسط إنتاج الحليب 6.08 كجم/يوم خلال فترة رضاعة تبلغ 201 يوم؛ وعمر أول ولادة 35.5 شهرًا؛ وفترة فاصلة بين الولادتين 14.4 شهرًا؛ ومدة الحمل 285 يومًا؛ وفترة شبق بعد الولادة 91.5 يومًا. يشير هذا التكاثر العالي إلى تكيف محلي قوي، متأثرًا بالعوامل الوراثية والإدارية، بالإضافة إلى مناخ ظفار الموسمي الفريد. ومنذ عام 1990، تم تنفيذ برنامج طويل الأمد للانتخاب الوراثي لهذه السلالة للحفاظ عليها في بيئتها وتحسينها وراثياً في محطة صلالة.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conservation Section */}
      <section id="cattle-conservation" className="conservation">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Conservation Efforts' : 'جهود الحفاظ'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 'Protecting Oman\'s valuable cattle genetic resources' : 'حماية الموارد الوراثية القيمة للأبقار في عمان'}
            </p>
          </div>
          <div className="conservation-content">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Genetic Characterization' : 'التوصيف الجيني'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'Comprehensive genetic studies to document and analyze the unique traits of Omani cattle breeds, confirming Bos indicus ancestry with admixture from Bos taurus lineages of African and Near Eastern origin.' :
                      'دراسات جينية شاملة لتوثيق وتحليل السمات الفريدة لسلالات الأبقار العمانية، مؤكدة أصول بوس إنديكوس مع خليط من سلالات بوس تاوروس من أصول أفريقية وشرق أوسطية.'
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
                      'Selective breeding programs to maintain genetic purity while enhancing productivity, with conservation efforts for Albatinah cattle initiated in 2003 at the Livestock Research Center in Rumais, and for Dhofari cattle since 1990 at the Salalah Research Station.' :
                      'برامج التربية الانتقائية للحفاظ على النقاء الجيني مع تعزيز الإنتاجية، مع جهود الحفاظ على أبقار الباطنة التي بدأت في عام 2003 في مركز بحوث الثروة الحيوانية في الرميس، وأبقار ظفار منذ عام 1990 في محطة أبحاث صلالة.'
                    }
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Gene Banking' : 'بنك الجينات'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'The Ministry of Agriculture, Fisheries and Water Resources has established a gene bank at the Livestock Research Centre in Rumais, represented initially by a cattle herd. It also focuses on the cryopreservation of semen from the North Oman and South Oman cattle breeds. These frozen semen straws are then used for the insemination of breeders cattle herds.' :
                      'أنشأت وزارة الزراعة والثروة السمكية وموارد المياه بنكًا للجينات في مركز بحوث الثروة الحيوانية في الرميس متمثلاً في قطيع الأبقار، وكذلك من خلال تجميد الحيوانات المنوية لسلالاتي أبقار شمال عمان وجنوب عمان، حيث يتم استخدام قشات السائل المنوي المجمد في تلقيح قطيع الأبقار لدى المربيين. '
                    }
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Research Collaboration' : 'التعاون البحثي'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'Multiple partnerships to study and preserve Oman\'s unique cattle genetic resources, with collaboration between MAFWR, SQU, OAPGRC and international organizations.' :
                      'شراكات متعددة لدراسة والحفاظ على الموارد الوراثية الفريدة للأبقار في عمان، مع تعاون بين وزارة الزراعة والثروة السمكية وموارد المياه، وجامعة السلطان قابوس، ومركز عمان للموارد الوراثية الحيوانية والنباتية والمنظمات الدولية.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="cattle-research" className="research">
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
                      {currentLang === 'en' ? 'Genetic Diversity Studies' : 'دراسات التنوع الجيني'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research has confirmed that Al-Batinah and Dhofari cattle are genetically distinct breeds with significant diversity between them. Genetic studies confirm the Bos indicus ancestry of Omani cattle but also reveal a degree of admixture with Bos taurus lineages of African and Near Eastern origin. This historical admixture might be a key factor underlying their adaptability, contrasting with the modern threat of genetic erosion from unmanaged crossbreeding with specialized exotic breeds. These studies help in designing appropriate breeding programs, increasing quality and productivity, and improving gene selection while preserving valuable adaptive traits.' :
                        'أكدت الأبحاث أن أبقار الباطنة وظفار هي سلالات متميزة وراثيًا مع تنوع كبير بينها. تؤكد الدراسات الجينية على أصول البوس انديكوس للأبقار العمانية ولكنها تكشف أيضًا عن درجة من الخلط مع سلالات البوس تاوروس من أصول أفريقية وشرق أوسطية. هذا الخلط التاريخي قد يكون عاملاً رئيسياً وراء قدرتها على التكيف، على النقيض من التهديد الحديث للتآكل الجيني من التهجين غير المدار مع السلالات الأجنبية المتخصصة. تساعد هذه الدراسات في تصميم برامج التربية المناسبة، وزيادة الجودة والإنتاجية، وتحسين اختيار الجينات مع الحفاظ على صفات التكيف القيمة.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/cattle_2.jpeg" alt="Genetic Research" />
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
                        'Studies are focused on improving the productivity of indigenous cattle breeds through enhanced nutrition, management practices, and health care while preserving their unique adaptive traits. The Dhofari breed shows particular promise with average milk yield of 6.08 kg/day and favorable reproductive traits including a calving interval of 14.4 months, shorter than many tropical breeds. This superior reproductive efficiency suggests strong local adaptation, making it a prime candidate for national breeding programs focused on sustainable productivity within Oman\'s environment, potentially reducing reliance on less-adapted exotic breeds.' :
                        'تركز الدراسات على تحسين إنتاجية سلالات الأبقار المحلية من خلال تحسين التغذية وممارسات الإدارة والرعاية الصحية مع الحفاظ على سماتها التكيفية الفريدة. تظهر سلالة الظفاري إمكانات خاصة بمتوسط إنتاج حليب يبلغ 6.08 كجم/يوم وسمات تناسلية مواتية بما في ذلك فترة ولادة تبلغ 14.4 شهرًا، وهي أقصر من العديد من السلالات الاستوائية. تشير هذه الكفاءة التناسلية المتفوقة إلى تكيف محلي قوي، مما يجعلها مرشحًا رئيسيًا لبرامج التربية الوطنية التي تركز على الإنتاجية المستدامة ضمن بيئة عُمان، مما قد يقلل الاعتماد على السلالات الأجنبية الأقل تكيفًا.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/cattle_3.jpeg" alt="Productivity Research" />
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
                        'Research is being conducted to understand the genetic basis of disease resistance in Omani cattle breeds. Both Albatinah and Dhofari cattle exhibit notable adaptations, including tolerance to parasites and infectious diseases, which allows for stable production performance even under challenging conditions. These indigenous breeds have developed natural resistance to various local diseases over centuries of adaptation. Identifying the genes responsible for this resistance could help in developing more resilient cattle populations globally, while preserving these valuable traits within Oman\'s breeding programs.' :
                        'يتم إجراء البحوث لفهم الأساس الجيني لمقاومة الأمراض في سلالات الأبقار العمانية. تُظهر كل من أبقار الباطنة وظفار تكيفات ملحوظة، بما في ذلك تحمُّل الطفيليات والأمراض المعدية، مما يسمح بأداء إنتاجي مستقر حتى في ظل الظروف الصعبة. طورت هذه السلالات المحلية مقاومة طبيعية لمختلف الأمراض المحلية على مدى قرون من التكيف. يمكن أن يساعد تحديد الجينات المسؤولة عن هذه المقاومة في تطوير مجموعات أبقار أكثر مرونة على مستوى العالم، مع الحفاظ على هذه السمات القيمة ضمن برامج التربية في عمان.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/cattle_4.jpeg" alt="Disease Resistance Research" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
     {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
};

export default CattlePage;
