import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import translations from '../scripts/translations.json';
import Header from './Header';

const PoultryPage = ({ currentLang, switchLanguage }) => {
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
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/arabic_image_25.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-content">
          <h1 className={`hero-title ${currentLang}`}>
            {currentLang === 'en' ? 'Omani Poultry Breeds' : 'سلالات الدواجن العمانية'}
          </h1>
          <p className={`hero-subtitle ${currentLang}`}>
            {currentLang === 'en' ? 
              'Discover the unique indigenous poultry breeds of Oman' :
              'اكتشف سلالات الدواجن المحلية الفريدة في عمان'
            }
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Indigenous Poultry Breeds of Oman' : 'سلالات الدواجن المحلية في سلطنة عمان'}
            </h2>
            <p className={`section-subtitle ${currentLang}`}>
              {currentLang === 'en' ? 
                'Oman has three genetically distinct indigenous poultry lines adapted to the local environment' :
                'تمتلك عمان ثلاثة سلالات متميزة وراثيًا من الدواجن المحلية متكيفة مع البيئة المحلية'
              }
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className={currentLang}>
                {currentLang === 'en' ? 
                  'The Sultanate of Oman is home to three genetically distinct indigenous poultry lines that have adapted to the country\'s challenging environmental conditions over centuries. These breeds play vital roles in food security, rural livelihoods, and cultural heritage. The local population of Omani poultry is currently low and considered at risk, making conservation efforts particularly important. Research has identified three main lines: white, black, and brown, each with distinct characteristics and production traits.' :
                  'تعد سلطنة عمان موطنًا لثلاثة سلالات متميزة وراثيًا من الدواجن المحلية التي تكيفت مع الظروف البيئية الصعبة في البلاد على مر القرون. تلعب هذه السلالات أدوارًا حيوية في الأمن الغذائي وسبل العيش الريفية والتراث الثقافي. يعتبر عدد الدواجن المحلية في عمان منخفضًا حاليًا ومعرضًا للخطر، مما يجعل جهود الحفاظ عليها ذات أهمية خاصة. حددت الأبحاث ثلاثة خطوط رئيسية: الأبيض والأسود والبني، كل منها له خصائص وسمات إنتاجية متميزة.'
                }
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-number" data-count="3">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Indigenous Poultry Lines' : 'سلالات الدواجن المحلية'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-count="183">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Maximum Egg Production' : 'الحد الأقصى لإنتاج البيض'}
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number" data-count="100">0</div>
                  <div className={`stat-label ${currentLang}`}>
                    {currentLang === 'en' ? 'Years of Adaptation' : 'سنوات من التكيف'}
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="/images/arabic_image_25.png" alt="Omani Poultry" className="featured-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Poultry Breeds Section */}
      <section id="resources" className="resources">
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${currentLang}`}>
              {currentLang === 'en' ? 'Poultry Breeds' : 'سلالات الدواجن في سلطنة عمان'}
            </h2>
          </div>
          <div className="resources-grid">
            {/* White Line Card */}
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/arabic_image_25.png" alt="White Line Poultry" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'White Line' : 'السلالة البيضاء'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The White Line is one of the most productive indigenous poultry lines in Oman. Characterized by their white feathers and medium body size, these birds are well-adapted to the local environmental conditions. The White Line demonstrates excellent growth rates and superior egg production capability compared to other local lines. With an average egg production of nearly 184 eggs per year and good feed conversion ratios, this line is highly valued by local farmers. Their adaptability to heat stress and local diseases makes them particularly suitable for traditional small-scale farming systems in Oman.' :
                    'تعد السلالة البيضاء واحدة من أكثر سلالات الدواجن المحلية إنتاجية في عمان. تتميز بريشها الأبيض وحجم الجسم المتوسط، وهذه الطيور متكيفة جيدًا مع الظروف البيئية المحلية. تظهر السلالة البيضاء معدلات نمو ممتازة وقدرة إنتاج بيض متفوقة مقارنة بالسلالات المحلية الأخرى. مع متوسط إنتاج البيض يقارب 184 بيضة سنويًا ونسب تحويل غذائي جيدة، تحظى هذه السلالة بتقدير كبير من المزارعين المحليين. قدرتها على التكيف مع الإجهاد الحراري والأمراض المحلية يجعلها مناسبة بشكل خاص لأنظمة الزراعة التقليدية صغيرة النطاق في عمان.'
                  }
                </p>
                <div className="breed-stats">
                  <h4 className={currentLang}>
                    {currentLang === 'en' ? 'Growth and Production Traits' : 'سمات النمو والإنتاج'}
                  </h4>
                  <table className={`stats-table ${currentLang}`}>
                    <thead>
                      <tr>
                        <th>{currentLang === 'en' ? 'Trait' : 'السمة'}</th>
                        <th>{currentLang === 'en' ? 'Value' : 'القيمة'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{currentLang === 'en' ? 'Day one Body Weight (g)' : 'وزن الجسم في اليوم الأول (جم)'}</td>
                        <td>29.2</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '6-week Body Weight (kg)' : 'وزن الجسم في 6 أسابيع (كجم)'}</td>
                        <td>1.21</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '10-week Body Weight (kg)' : 'وزن الجسم في 10 أسابيع (كجم)'}</td>
                        <td>1.99</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '21-week Body Weight (kg)' : 'وزن الجسم في 21 أسبوع (كجم)'}</td>
                        <td>2.22</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Marketing Weight (kg)' : 'وزن التسويق (كجم)'}</td>
                        <td>1.72</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Conception (%)' : 'معدل الإخصاب (%)'}</td>
                        <td>86.39</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Hatching (%)' : 'معدل الفقس (%)'}</td>
                        <td>53.93</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Egg Weight (g)' : 'وزن البيضة (جم)'}</td>
                        <td>44.87</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Average Egg Production (Eggs)' : 'متوسط إنتاج البيض (بيضة)'}</td>
                        <td>183.74</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Brown Line Card */}
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/brown_chicken.png" alt="Brown Line Poultry" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Brown Line' : 'السلالة البنية'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Brown Line of Omani indigenous poultry is characterized by its brown feathers and medium to large body size. This line shows growth and productive traits similar to the White Line, making it an important genetic resource for the country. Brown Line chickens demonstrate good adaptation to local conditions and reasonable disease resistance. They have good egg production capacity with an average of 146 eggs per year. Research has shown that the Brown Line has potential for improvement through selective breeding programs. Due to their hardiness and adaptability, they are suitable for both traditional farming systems and more structured small-scale production.' :
                    'تتميز السلالة البنية من الدواجن العمانية المحلية بريشها البني وحجم الجسم المتوسط إلى الكبير. تظهر هذه السلالة سمات نمو وإنتاج مماثلة للسلالة البيضاء، مما يجعلها موردًا وراثيًا مهمًا للبلاد. دجاج السلالة البنية يظهر تكيفًا جيدًا مع الظروف المحلية ومقاومة معقولة للأمراض. لديهم قدرة جيدة على إنتاج البيض بمتوسط 146 بيضة سنويًا. أظهرت الأبحاث أن السلالة البنية لديها إمكانية للتحسين من خلال برامج التربية الانتقائية. نظرًا لقوتهم وقدرتهم على التكيف، فهم مناسبون لأنظمة الزراعة التقليدية والإنتاج المنظم صغير النطاق.'
                  }
                </p>
                <div className="breed-stats">
                  <h4 className={currentLang}>
                    {currentLang === 'en' ? 'Growth and Production Traits' : 'سمات النمو والإنتاج'}
                  </h4>
                  <table className={`stats-table ${currentLang}`}>
                    <thead>
                      <tr>
                        <th>{currentLang === 'en' ? 'Trait' : 'السمة'}</th>
                        <th>{currentLang === 'en' ? 'Value' : 'القيمة'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{currentLang === 'en' ? 'Day one Body Weight (g)' : 'وزن الجسم في اليوم الأول (جم)'}</td>
                        <td>30.8</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '6-week Body Weight (kg)' : 'وزن الجسم في 6 أسابيع (كجم)'}</td>
                        <td>1.05</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '10-week Body Weight (kg)' : 'وزن الجسم في 10 أسابيع (كجم)'}</td>
                        <td>1.82</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '21-week Body Weight (kg)' : 'وزن الجسم في 21 أسبوع (كجم)'}</td>
                        <td>2.27</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Marketing Weight (kg)' : 'وزن التسويق (كجم)'}</td>
                        <td>1.57</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Conception (%)' : 'معدل الإخصاب (%)'}</td>
                        <td>87.14</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Hatching (%)' : 'معدل الفقس (%)'}</td>
                        <td>54.85</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Egg Weight (g)' : 'وزن البيضة (جم)'}</td>
                        <td>46.72</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Average Egg Production (Eggs)' : 'متوسط إنتاج البيض (بيضة)'}</td>
                        <td>146.21</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Black Line Card */}
            <div className="resource-card">
              <div className="card-image">
                <img src="/images/black_ckicken.png" alt="Black Line Poultry" />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>
                  {currentLang === 'en' ? 'Black Line' : 'السلالة السوداء'}
                </h3>
                <p className={`card-description ${currentLang}`}>
                  {currentLang === 'en' ? 
                    'The Black Line of Omani indigenous poultry is distinguished by its black feathers and generally smaller body size compared to the White and Brown lines. While research has shown that the Black Line is inferior in terms of growth and productive traits, it remains an important genetic resource that is being preserved for its unique characteristics and genetic diversity. The Black Line has demonstrated remarkable hardiness and strong natural immunity to certain local diseases, making it valuable for conservation efforts. Despite its lower productivity, this line is being maintained as part of Oman\'s commitment to preserving its indigenous animal genetic resources.' :
                    'تتميز السلالة السوداء من الدواجن العمانية المحلية بريشها الأسود وحجم الجسم الأصغر عمومًا مقارنة بالسلالتين البيضاء والبنية. بينما أظهرت الأبحاث أن السلالة السوداء أقل من حيث سمات النمو والإنتاج، إلا أنها تظل موردًا جينيًا مهمًا يتم الحفاظ عليه لخصائصه الفريدة وتنوعه الجيني. أظهرت السلالة السوداء صلابة ملحوظة ومناعة طبيعية قوية ضد بعض الأمراض المحلية، مما يجعلها قيمة لجهود الحفظ. على الرغم من إنتاجيتها المنخفضة، يتم الحفاظ على هذه السلالة كجزء من التزام عمان بالحفاظ على مواردها الوراثية الحيوانية المحلية.'
                  }
                </p>
                <div className="breed-stats">
                  <h4 className={currentLang}>
                    {currentLang === 'en' ? 'Growth and Production Traits' : 'سمات النمو والإنتاج'}
                  </h4>
                  <table className={`stats-table ${currentLang}`}>
                    <thead>
                      <tr>
                        <th>{currentLang === 'en' ? 'Trait' : 'السمة'}</th>
                        <th>{currentLang === 'en' ? 'Value' : 'القيمة'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{currentLang === 'en' ? 'Day one Body Weight (g)' : 'وزن الجسم في اليوم الأول (جم)'}</td>
                        <td>28.0</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '6-week Body Weight (kg)' : 'وزن الجسم في 6 أسابيع (كجم)'}</td>
                        <td>0.49</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '10-week Body Weight (kg)' : 'وزن الجسم في 10 أسابيع (كجم)'}</td>
                        <td>1.00</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? '21-week Body Weight (kg)' : 'وزن الجسم في 21 أسبوع (كجم)'}</td>
                        <td>1.30</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Marketing Weight (kg)' : 'وزن التسويق (كجم)'}</td>
                        <td>1.46</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Conception (%)' : 'معدل الإخصاب (%)'}</td>
                        <td>87.16</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Hatching (%)' : 'معدل الفقس (%)'}</td>
                        <td>36.68</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Egg Weight (g)' : 'وزن البيضة (جم)'}</td>
                        <td>43.18</td>
                      </tr>
                      <tr>
                        <td>{currentLang === 'en' ? 'Average Egg Production (Eggs)' : 'متوسط إنتاج البيض (بيضة)'}</td>
                        <td>76.09</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              {currentLang === 'en' ? 'Protecting Oman\'s valuable poultry genetic resources' : 'حماية الموارد الوراثية القيمة للدواجن في عمان'}
            </p>
          </div>
          <div className="conservation-content">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Selection Program' : 'برنامج الانتقاء'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'A three-year experimental selection program (2010-2012) identified the three distinct local poultry lines and established conservation priorities.' :
                      'حدد برنامج انتقاء تجريبي لمدة ثلاث سنوات (2010-2012) ثلاثة سلالات محلية متميزة من الدواجن وأسس أولويات الحفظ.'
                    }
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Breeding Management' : 'إدارة التربية'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'Intensive selection programs focus on improving the White and Brown lines while maintaining the Black line as an important genetic resource.' :
                      'تركز برامج الانتقاء المكثفة على تحسين السلالتين البيضاء والبنية مع الحفاظ على السلالة السوداء كمورد جيني مهم.'
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
                      'Collection and preservation of genetic material from all three poultry lines in the national gene bank for long-term conservation.' :
                      'جمع وحفظ المواد الوراثية من جميع سلالات الدواجن الثلاثة في بنك الجينات الوطني للحفظ على المدى الطويل.'
                    }
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>
                    {currentLang === 'en' ? 'Community Involvement' : 'مشاركة المجتمع'}
                  </h3>
                  <p className={currentLang}>
                    {currentLang === 'en' ? 
                      'Working with local farmers to maintain and expand local poultry populations, particularly in the Dhofar region where the risk is highest.' :
                      'العمل مع المزارعين المحليين للحفاظ على مجموعات الدواجن المحلية وتوسيعها، لا سيما في منطقة ظفار حيث يكون الخطر أعلى.'
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
                      {currentLang === 'en' ? 'Genetic Diversity Studies' : 'دراسات التنوع الجيني'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Research has confirmed that the three indigenous poultry lines of Oman are genetically distinct, each with unique characteristics and adaptations. Molecular characterization studies are ongoing to map the genetic makeup of these lines and identify valuable genetic traits that could contribute to global poultry genetic diversity. These studies are crucial for designing effective conservation strategies and breeding programs to preserve and potentially enhance these at-risk genetic resources.' :
                        'أكدت الأبحاث أن سلالات الدواجن المحلية الثلاثة في عمان متميزة وراثيًا، كل منها بخصائص وتكيفات فريدة. تستمر دراسات التوصيف الجزيئي لرسم خريطة التركيب الجيني لهذه السلالات وتحديد السمات الجينية القيمة التي يمكن أن تساهم في التنوع الجيني العالمي للدواجن. هذه الدراسات حاسمة لتصميم استراتيجيات فعالة للحفظ وبرامج تربية للحفاظ وتعزيز هذه الموارد الجينية المعرضة للخطر.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/arabic_image_22.jpg" alt="Genetic Research" />
                  </div>
                </div>
              </div>
              <div className={`tab-pane ${activeTab === 'productivity' ? 'active' : ''}`} id="productivity">
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>
                      {currentLang === 'en' ? 'Improving Egg and Meat Production' : 'تحسين إنتاج البيض واللحوم'}
                    </h3>
                    <p className={currentLang}>
                      {currentLang === 'en' ? 
                        'Studies are focused on improving the productivity of indigenous poultry lines through enhanced nutrition, management practices, and selective breeding while preserving their unique adaptive traits. Particular emphasis is placed on the White and Brown lines, which show the most promising production characteristics. Research aims to develop balanced feeding regimes and husbandry practices that maximize production while maintaining the birds\' natural resilience to local environmental challenges.' :
                        'تركز الدراسات على تحسين إنتاجية سلالات الدواجن المحلية من خلال تحسين التغذية وممارسات الإدارة والتربية الانتقائية مع الحفاظ على سماتها التكيفية الفريدة. يتم التركيز بشكل خاص على السلالتين البيضاء والبنية، اللتين تظهران أكثر خصائص الإنتاج الواعدة. تهدف الأبحاث إلى تطوير أنظمة غذائية متوازنة وممارسات تربية تعظم الإنتاج مع الحفاظ على مرونة الطيور الطبيعية للتحديات البيئية المحلية.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/poultry.jpg" alt="Productivity Research" />
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
                        'Research is being conducted to understand the genetic basis of disease resistance in Omani poultry lines, particularly in the Black line which shows notable disease resistance despite lower productivity. These indigenous breeds have developed natural resistance to various local diseases over centuries of adaptation. Identifying the genes responsible for this resistance could contribute to developing more resilient poultry populations globally and enhance sustainable poultry production in challenging environments with minimal use of antibiotics or other medical interventions.' :
                        'يتم إجراء البحوث لفهم الأساس الجيني لمقاومة الأمراض في سلالات الدواجن العمانية، خاصة في السلالة السوداء التي تظهر مقاومة ملحوظة للأمراض رغم انخفاض الإنتاجية. طورت هذه السلالات المحلية مقاومة طبيعية لمختلف الأمراض المحلية على مدى قرون من التكيف. يمكن أن يساعد تحديد الجينات المسؤولة عن هذه المقاومة في تطوير مجموعات دواجن أكثر مرونة على مستوى العالم وتعزيز إنتاج الدواجن المستدام في البيئات الصعبة مع الحد الأدنى من استخدام المضادات الحيوية أو التدخلات الطبية الأخرى.'
                      }
                    </p>
                  </div>
                  <div className="tab-image">
                    <img src="/images/poultry.jpg" alt="Disease Resistance Research" />
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
                <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon" aria-label="Youtube"><i className="fab fa-youtube"></i></a>
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

export default PoultryPage;
