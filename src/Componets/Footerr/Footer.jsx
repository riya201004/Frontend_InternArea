import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../i18/LanguageSwitcher';


function Footer() {
    const { t } = useTranslation();
  return (
    <div>
   <footer class="bg-gray-800 text-white">
    <div class="container px-6 py-12 mx-auto">


        <div class="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <LanguageSwitcher />
            <div>
                <h3 class="text-sm font-bold  ">{t('footer.internshipsByPlaces')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                <p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.NY')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.LA')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.Chicago')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.SF')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.Miami')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.Seattle')}</p>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('footer.internshipsByStream')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                <p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.about')} </p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.careers')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.press')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.news')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.media')}</p>
<p class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.contact')}</p>

                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('footer.jobPlaces')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.blog')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.newsletter')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.events')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.help')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.tutorials')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.support')}</a>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-bold  ">{t('footer.jobsByStream')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.enterprise')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.government')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.saas')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.marketplaces')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.ecommerce')}</a>
                </div>
            </div>

           

          
        </div>
        
        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>
        <div>
                <h3 class="text-sm font-bold  ">{t('footer.about')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('footer.diary')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('register.T&C')}</h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.startups')}</a>
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.enterprise')}</a>
                 
                </div>
            </div>
        <div>
                <h3 class="text-sm font-bold  ">{t('footer.sitemap')} </h3>

                <div class="flex flex-col items-start mt-4 space-y-4">
                    <a href="/" class=" transition-colors duration-200 dark dark:hover:text-blue-400 hover:underline hover:text-blue-600">{t('footer.startups')}</a>
            
                 
                </div>
            </div>
        <div class="flex flex-col items-center justify-between sm:flex-row">
          <p className='border-white' >
          <i class="bi bi-google-play text-black"></i>  {t('footer.getAndroid')}
          </p>
          <div class="social-icons">
  <i class="fab fa-facebook"></i>
  <i class="fab fa-twitter"></i>
  <i class="fab fa-instagram"></i>

</div>
            <p class="mt-4 text-sm  sm:mt-0 dark">{t('footer.copyright')}</p>
        </div>
    </div>
</footer>

    </div>
  )
}

export default Footer
