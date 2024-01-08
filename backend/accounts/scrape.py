import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
# from bs4 import BeautifulSoup
from Reminder.models import Job

def web_driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--verbose")
    options.add_argument('--no-sandbox')
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument("--window-size=1920, 1200")
    options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(options=options)
    return driver
# driver = web_driver()

# driver.get('https://www.google.com')

# # Initialize a web driver (make sure you have a driver installed)
# driver = web_driver()  # Update with the path to your driver



class SeleniumScraper:
    def __init__(self):
        self.job_data = []
        self.driver = web_driver()
    def scrape_linkedin_jobs(self):
        # self.base_url = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?location=Morocco&geoId=102787409&trk=public_jobs_jobs-search-bar_search-submit&start=0'
        position=0
        self.base_url ='https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=&location=Morocco&locationId=&geoId=102787409&f_TPR=r86400&start={position}'  


        positions = [0, 25, 50,75]

        for position in positions:
            self.driver.get(self.base_url.format(position=position))
            jobs = self.driver.find_elements(By.CSS_SELECTOR, "li")
            if jobs:
                for job in jobs:
                    job_item = {}
                    job_item['job_title'] = job.find_element(By.CSS_SELECTOR, "h3").text.strip()
                    job_item['job_detail_url'] = job.find_element(By.CSS_SELECTOR, ".base-card__full-link").get_attribute('href').strip()
                    job_item['job_listed'] = job.find_element(By.CSS_SELECTOR, 'time').text.strip()
                    job_item['company_name'] = job.find_element(By.CSS_SELECTOR, 'h4 a').text.strip()
                    job_item['company_link'] = job.find_element(By.CSS_SELECTOR, 'h4 a').get_attribute('href')
                    job_item['company_location'] = job.find_element(By.CSS_SELECTOR, '.job-search-card__location').text.strip()
                    self.job_data.append(job_item)
        # self.driver.get(self.base_url.format(position=position))
        # jobs = self.driver.find_elements(By.CSS_SELECTOR, "li")
        # for job in jobs:
        #     job_item = {}
        #     job_item['job_title'] = job.find_element(By.CSS_SELECTOR, "h3").text.strip()
        #     job_item['job_detail_url'] = job.find_element(By.CSS_SELECTOR, ".base-card__full-link").get_attribute('href').strip()
        #     job_item['job_listed'] = job.find_element(By.CSS_SELECTOR, 'time').text.strip()
        #     job_item['company_name'] = job.find_element(By.CSS_SELECTOR, 'h4 a').text.strip()
        #     job_item['company_link'] = job.find_element(By.CSS_SELECTOR, 'h4 a').get_attribute('href')
        #     job_item['company_location'] = job.find_element(By.CSS_SELECTOR, '.job-search-card__location').text.strip()
        #     self.job_data.append(job_item)
        # position=25
        # self.driver.get(self.base_url.format(position=position))
        # jobs = self.driver.find_elements(By.CSS_SELECTOR, "li")
        # for job in jobs:
        #     job_item = {}
        #     job_item['job_title'] = job.find_element(By.CSS_SELECTOR, "h3").text.strip()
        #     job_item['job_detail_url'] = job.find_element(By.CSS_SELECTOR, ".base-card__full-link").get_attribute('href').strip()
        #     job_item['job_listed'] = job.find_element(By.CSS_SELECTOR, 'time').text.strip()
        #     job_item['company_name'] = job.find_element(By.CSS_SELECTOR, 'h4 a').text.strip()
        #     job_item['company_link'] = job.find_element(By.CSS_SELECTOR, 'h4 a').get_attribute('href')
        #     job_item['company_location'] = job.find_element(By.CSS_SELECTOR, '.job-search-card__location').text.strip()
        #     self.job_data.append(job_item)
        # position=50
        # self.driver.get(self.base_url.format(position=position))
        # jobs = self.driver.find_elements(By.CSS_SELECTOR, "li")
        # for job in jobs:
        #     job_item = {}
        #     job_item['job_title'] = job.find_element(By.CSS_SELECTOR, "h3").text.strip()
        #     job_item['job_detail_url'] = job.find_element(By.CSS_SELECTOR, ".base-card__full-link").get_attribute('href').strip()
        #     job_item['job_listed'] = job.find_element(By.CSS_SELECTOR, 'time').text.strip()
        #     job_item['company_name'] = job.find_element(By.CSS_SELECTOR, 'h4 a').text.strip()
        #     job_item['company_link'] = job.find_element(By.CSS_SELECTOR, 'h4 a').get_attribute('href')
        #     job_item['company_location'] = job.find_element(By.CSS_SELECTOR, '.job-search-card__location').text.strip()
        #     self.job_data.append(job_item)

    def scrape_facebook_jobs(self):
        self.driver.get('https://web.facebook.com/search_results/?q=stage+en++data+analyst+maroc')
        time.sleep(5)
        username_input = self.driver.find_element(By.ID, "email")
        username_input.send_keys("brahimlouardi6@gmail.com")
        password_input = self.driver.find_element(By.ID, "pass")
        password_input.send_keys("qwertyuiop@12345")
        login_button = self.driver.find_element(By.NAME, "login")
        login_button.click()
        time.sleep(10)
        jobs = self.driver.find_elements(By.CSS_SELECTOR, 'div.x193iq5w.x1xwk8fm>div')


        for job in jobs[1:4]:
            job_item = {}
            job_item['job_publisher_detail'] = job.find_element(By.CSS_SELECTOR, 'div.xu06os2.x1ok221b').text
            post_div = job.find_element(By.CSS_SELECTOR, 'div[data-ad-comet-preview="message"]')
            job_detail = post_div.find_elements(By.CSS_SELECTOR, 'span[dir="auto"]')
            job_detail_text = '\n'.join([item.text for item in job_detail])
            job_item['job_detail'] = job_detail_text
            self.job_data.append(job_item)


    def scrape_twitter_jobs(self):
        driver = web_driver()
        driver.get('https://twitter.com/search?q=stage%20data%20maroc&src=typed_query&f=top')
        time.sleep(5)

        jobs = driver.find_elements(By.CSS_SELECTOR, 'div.css-1dbjc4n > div > div')
        for job in jobs:
            job_item = {}
            publisher_info_outer_div = job.find_element(By.CSS_SELECTOR, 'div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs.r-1ny4l3l')
            publisher_info_inner_text = publisher_info_outer_div.find_element(By.CSS_SELECTOR, 'span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0')
            job_item['job_publisher_detail'] = publisher_info_inner_text.text

            post_div = job.find_element(By.CSS_SELECTOR, 'div.css-901oao.css-cens5h.r-1nao33i.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0')
            job_detail = post_div.find_elements(By.CSS_SELECTOR, 'span')
            job_detail_text = ' '.join([item.text for item in job_detail])
            job_item['job_detail'] = job_detail_text

            self.job_data.append(job_item)

    def save_data(self):
        Job.objects.all().delete()
        for job_data in self.job_data:
            # print(job_data)
            Job.objects.create(
                job_title=job_data.get('job_title', ''),
                job_detail_url=job_data.get('job_detail_url', ''),
                job_listed=job_data.get('job_listed', ''),
                company_name=job_data.get('company_name', ''),
                company_link=job_data.get('company_link', ''),
                company_location=job_data.get('company_location', ''),
            )
        print("Jobs saved successfully.")

if __name__ == '__main__':
    scraper = SeleniumScraper()
    scraper.scrape_linkedin_jobs()
    # scraper.scrape_facebook_jobs()
    # scraper.scrape_twitter_jobs()
    scraper.save_data()

# Close the driver when done
# driver.quit()
