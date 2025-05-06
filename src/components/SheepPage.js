import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const SheepPage = ({ currentLang, switchLanguage }) => {
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

  const conservationTimeline = [
    {
      title: {
        en: 'Breeding Centers',
        ar: 'مراكز التربية'
      },
      content: {
        en: 'Establishment of breeding programs to maintain pure lines of both Northern and Dhofari sheep.',
        ar: 'إنشاء برامج التربية للحفاظ على السلالات النقية من الأغنام الشمالية والظفارية.'
      }
    },
    {
      title: {
        en: 'Documentation',
        ar: 'التوثيق'
      },
      content: {
        en: 'Recording physical characteristics and performance data of indigenous sheep breeds.',
        ar: 'تسجيل الخصائص الفيزيائية وبيانات الأداء لسلالات الأغنام المحلية.'
      }
    },
    {
      title: {
        en: 'Farmer Support',
        ar: 'دعم المزارعين'
      },
      content: {
        en: 'Providing technical assistance to farmers raising indigenous sheep breeds.',
        ar: 'تقديم المساعدة الفنية للمزارعين الذين يربون سلالات الأغنام المحلية.'
      }
    },
    {
      title: {
        en: 'Research Programs',
        ar: 'برامج البحث'
      },
      content: {
        en: 'Scientific studies to understand genetic diversity and development of conservation strategies.',
        ar: 'دراسات علمية لفهم التنوع الجيني وتطوير استراتيجيات الحفظ.'
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
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/sheep.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <h1 className={`hero-title ${currentLang}`}>
            {currentLang === 'en' ? 'Omani Sheep Breeds' : 'سلالات الأغنام العمانية'}
          </h1>
          <p className={`hero-subtitle ${currentLang}`}>
            {currentLang === 'en' ? 
              'Discover the unique indigenous sheep breeds of Oman' :
              'اكتشف سلالات الأغنام المحلية الفريدة في عمان'
            }
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Indigenous Sheep Breeds of Oman' : 'سلالات الأغنام المحلية في سلطنة عمان'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Two main populations of sheep populations are found across the Sultanate, adapted to distinct regional environments' :
                'توجد مجموعتان رئيسيتان من الأغنام في جميع أنحاء السلطنة، متكيفتان مع بيئات إقليمية مختلفة'
              }
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'The Sultanate of Oman is home to two main populations of indigenous sheep: the Northern Omani sheep and the Dhofari sheep. These remarkable breeds represent centuries of adaptation to Oman\'s diverse environmental conditions. The Northern Omani sheep are the more numerous of the two, widely distributed across the northern governorates including Muscat, Al Sharqiyah, Al Batinah, Al Dakhiliyah, and Al Dhahirah. They are fat-tailed sheep well-adapted to the arid conditions and harsh climate of the region. The Dhofari sheep, found in the Dhofar Governorate, are smaller in number but equally important, specifically adapted to the unique seasonal monsoon (khareef) climate of southern Oman. Both breeds are valued for their meat production and resilience to local conditions, playing crucial roles in rural livelihoods and food security across the Sultanate.' :
                  'تعد سلطنة عمان موطناً لمجموعتين رئيسيتين من الأغنام المحلية: الأغنام العمانية الشمالية والأغنام الظفارية. تمثل هاتان السلالتان الرائعتان قروناً من التكيف مع الظروف البيئية المتنوعة في عمان. الأغنام العمانية الشمالية هي الأكثر عدداً من بين الاثنتين، وهي منتشرة على نطاق واسع في المحافظات الشمالية بما في ذلك مسقط والشرقية والباطنة والداخلية والظاهرة. وهي أغنام ذات ذيل دهني متكيفة جيداً مع الظروف القاحلة والمناخ القاسي في المنطقة. الأغنام الظفارية، الموجودة في محافظة ظفار، أقل عدداً ولكنها لا تقل أهمية، متكيفة خصيصاً مع المناخ الموسمي الفريد للرياح الموسمية (الخريف) في جنوب عمان. كلتا السلالتين تحظى بتقدير لإنتاجها من اللحوم وقدرتها على الصمود أمام الظروف المحلية، وتلعب أدواراً حاسمة في سبل العيش الريفية والأمن الغذائي في جميع أنحاء السلطنة.'
                }
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number" data-count="2">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Indigenous Sheep Populations' : 'سلالات الضأن المحلي'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-count="91">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Percent Northern Population' : 'نسبة أعداد قطيع الضأن الشمالي إلى المجموع العام من الضأن المحلي'}
                  </div>
                </div>
                
              </div>
            </div>
            <div className="about-image">
              <img src="/images/Northern_Omani_Sheep.png" alt="Omani Sheep" className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="resources">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Sheep Breeds' : 'سلالات الأغنام في سلطنة عمان'}
            </h2>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/Northern_Omani_Sheep.png" alt="Northern Omani Sheep" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Northern Omani Sheep' : 'الأغنام العمانية الشمالية'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Northern Omani sheep are the predominant sheep breed in the Sultanate, representing more than 90% of the total sheep population. This is a fat-tailed sheep breed (Ovis aries) characterized by its ability to store energy in its fat tail, making it well-adapted to the arid environment. The color ranges from white to light brown, with some individuals having darker brown or black spots. These sheep have a medium-sized body frame with males being larger than females. They have a straight profile, medium-sized ears, and are typically polled (without horns). The breed is highly valued for its meat production and resilience to harsh environmental conditions. They are widely distributed throughout the northern governorates, including Muscat, North and South Al Sharqiyah, North and South Al Batinah, Al Dakhiliyah, and Al Dhahirah. Their adaptability to local conditions makes them essential for sustainable sheep farming in the region.' :
                    'تعد الأغنام العمانية الشمالية السلالة السائدة في السلطنة، حيث تمثل أكثر من 90% من إجمالي أعداد الأغنام. هذه سلالة أغنام ذات ذيل دهني (Ovis aries) تتميز بقدرتها على تخزين الطاقة في ذيلها الدهني، مما يجعلها متكيفة جيداً مع البيئة القاحلة. يتراوح اللون من الأبيض إلى البني الفاتح، مع وجود بعض الأفراد التي تحمل بقعاً بنية أو سوداء داكنة. هذه الأغنام لها جسم متوسط الحجم مع الذكور الأكبر من الإناث. لديها ملف شخصي مستقيم، وآذان متوسطة الحجم، وعادة ما تكون بدون قرون. تحظى السلالة بتقدير كبير لإنتاجها من اللحوم ومرونتها في مواجهة الظروف البيئية القاسية. وهي منتشرة على نطاق واسع في جميع أنحاء المحافظات الشمالية، بما في ذلك مسقط وشمال وجنوب الشرقية وشمال وجنوب الباطنة والداخلية والظاهرة. قدرتها على التكيف مع الظروف المحلية تجعلها ضرورية لتربية الأغنام المستدامة في المنطقة.'
                  }
                </p>
              </div>
            </div>
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/Dhofari_Sheep.jpg" alt="Dhofari Sheep" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Dhofari Sheep' : 'الأغنام الظفارية'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'Dhofari sheep are a distinct population found exclusively in the Dhofar Governorate in southern Oman. This breed is smaller than Northern Omani sheep and represents less than 10% of the total sheep population in the country. They are well-adapted to the unique khareef (monsoon) climate of Dhofar, characterized by cool temperatures and heavy fog during the months of June to September. The breed typically has a black, white, or mixed coat coloration and maintains a lean body structure without the pronounced fat tail seen in Northern sheep. Dhofari sheep are valued for their meat quality and adaptation to the distinct environmental conditions of southern Oman, including their resistance to local parasites and diseases prevalent in the humid monsoon climate. They are mainly found in the mountainous regions of Dhofar and the Salalah plain.' :
                    'الأغنام الظفارية هي سلالة مميزة توجد حصرياً في محافظة ظفار في جنوب عمان. هذه السلالة أصغر من الأغنام العمانية الشمالية وتمثل أقل من 10% من إجمالي أعداد الأغنام في البلاد. إنها متكيفة جيداً مع المناخ الفريد للخريف (الرياح الموسمية) في ظفار، والذي يتميز بدرجات حرارة باردة وضباب كثيف خلال الأشهر من يونيو إلى سبتمبر. تتميز السلالة عادة بلون أسود أو أبيض أو مختلط وتحافظ على بنية جسم نحيلة دون الذيل الدهني الواضح الموجود في الأغنام الشمالية. تحظى الأغنام الظفارية بتقدير لجودة لحومها وتكيفها مع الظروف البيئية المتميزة لجنوب عمان، بما في ذلك مقاومتها للطفيليات المحلية والأمراض السائدة في المناخ الرطب الموسمي. توجد بشكل رئيسي في المناطق الجبلية من ظفار وسهل صلالة.'
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
              {currentLang === 'en' ? 'Protecting Oman\'s valuable sheep genetic resources' : 'حماية الموارد الوراثية القيمة للأغنام في عمان'}
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
                      {currentLang === 'en' ? 'Understanding Genetic Diversity' : 'فهم التنوع الجيني'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research to characterize the genetic makeup of Northern and Dhofari sheep populations, including studies on their adaptation to specific environmental conditions.' :
                        'بحث لتوصيف التركيب الجيني لسكان الأغنام الشمالية والظفارية، بما في ذلك دراسات حول تكيفها مع الظروف البيئية المحددة.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/Dhofari_Sheep.jpg" alt="Genetic Research" />
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === 'productivity' ? 'active' : ''}`}>
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Improving Meat Production' : 'تحسين إنتاج اللحوم'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Studies focused on improving meat yield and quality through better nutrition and management practices while maintaining breed purity.' :
                        'دراسات تركز على تحسين إنتاج اللحوم وجودتها من خلال تحسين التغذية وممارسات الإدارة مع الحفاظ على نقاء السلالة.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/sheep.jpg" alt="Productivity Research" />
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === 'disease' ? 'active' : ''}`}>
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Health Management' : 'إدارة الصحة'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research on parasite resistance and disease management specific to each breed\'s environment, particularly for Dhofari sheep in monsoon conditions.' :
                        'البحث في مقاومة الطفيليات وإدارة الأمراض الخاصة ببيئة كل سلالة، خاصة للأغنام الظفارية في ظروف الرياح الموسمية.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/sheep.jpg" alt="Disease Resistance Research" />
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
                  <li><a href="#conservation">
                    {currentLang === 'en' ? 'Conservation' : 'جهود الحفاظ'}
                  </a></li>
                  <li><a href="#research">
                    {currentLang === 'en' ? 'Research' : 'البحث'}
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

export default SheepPage;
