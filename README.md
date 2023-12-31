# AI Image Post Generator

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage Instructions](#usage-instructions)
6. [Screenshots](#screenshots)
7. [Frequently Asked Questions (FAQs)](#frequently-asked-questions-faqs)
8. [Changelog](#changelog)
9. [Credits and Acknowledgments](#credits-and-acknowledgments)
10. [License](#license)

## Description
The AI Image Post Generator is a WordPress plugin that automates blog post creation by utilizing the Chooch AI Vision Studio ImageChat API, OpenAI API, and Unsplash API. It generates a complete blog post, including the title, content, and SEO elements, based on a featured image selected from the WordPress media library. The plugin is fully integrated with the Gutenberg editor and includes custom Gutenberg blocks like 'Unsplash Image' and 'Unsplash Card' for enhanced content creation.

## Features
- **Automated Post Creation:** Generates posts based on the featured image.
- **SEO Optimization:** Includes keyword generation for SEO.
- **Custom Gutenberg Blocks:** 'Unsplash Image' and 'Unsplash Card' for adding images.
- **Unsplash Integration:** Search and embed Unsplash images directly.
- **Image Enhancement:** Generates alt text and captions for images.

## Requirements

To ensure the best performance and compatibility, the AI Image Post Generator plugin requires the following:

- **WordPress Version:** Your WordPress installation should be version 5.7 or higher. This ensures compatibility with the Gutenberg editor and latest WordPress features.

- **PHP Version:** PHP 7.4 or higher is recommended. This version provides improved performance and security features.

- **API Keys:** You will need to obtain and configure API keys for the following services:
  - [Chooch AI Vision Studio ImageChat API](https://app.chooch.ai/feed/sign_up/)
  - [OpenAI API](https://platform.openai.com/signup)

#### For Asset Customization

- **Node.js:** Node.js version 16 or higher. This is necessary for certain development tasks and running build scripts that may be part of the plugin.

- **Composer:** Ensure you have Composer installed for managing PHP dependencies.

Please make sure that your WordPress environment meets these requirements to ensure smooth operation of the AI Image Post Generator plugin.

## Installation

### Downloading the Plugin from GitHub
1. **Visit the GitHub Repository:**
   - Go to [AI Image Post Generator on GitHub](https://github.com/kyguney/ai-image-post-generator).
   - This is the official repository for the plugin.

2. **Download the Plugin:**
   - Locate the 'Code' button on the GitHub repository page.
   - Click it and select 'Download ZIP' from the dropdown menu.
   - This will download the plugin as a ZIP file to your computer.

### Installing the Plugin on Your WordPress Site
1. **Access Your WordPress Dashboard:**
   - Log in to your WordPress website's admin dashboard.

2. **Upload the Plugin:**
   - Navigate to 'Plugins' > 'Add New'.
   - Click on the 'Upload Plugin' button at the top of the page.
   - Choose the downloaded ZIP file of the AI Image Post Generator plugin.
   - Click 'Install Now'.

3. **Activate the Plugin:**
   - After the installation is complete, click the 'Activate Plugin' link to activate AI Image Post Generator on your WordPress site.
   - Alternatively, you can navigate to 'Plugins' > 'Installed Plugins', find the AI Image Post Generator, and click 'Activate'.

### Post-Installation Setup
- After activation, proceed to the plugin's settings to configure it. Follow the 'Usage Instructions' section of this README for guidance on configuration and usage.

## Usage Instructions

### Step 1: Activate the Plugin
After installing the plugin, go to your WordPress dashboard, navigate to the 'Plugins' section, and activate the 'AI Image Post Generator'.

### Step 2: API Key Configuration
- **AIPG Settings:** In your WordPress dashboard, go to 'Settings' and find 'AIPG Settings'.
- **Enter API Keys:** Here, you need to input your API keys for Chooch AI Vision Studio ImageChat and OpenAI. If you're planning to use Unsplash images, enter your Unsplash API key as well.
- **Save Settings:** Ensure all API keys are correctly entered and save your settings.

### Step 3: Creating a Post
- **Select a Featured Image:** Start a new post and choose a featured image from your WordPress media library. This image will be the basis for your content.
- **Generate Content:** Once the image is selected, the plugin uses the APIs to describe the image and generate a post by pressing "Generate Post with AI" button. This includes the post title, content, image alt text, and SEO-optimized keywords.
- **Edit and Customize:** After the initial content is generated, you can edit and customize it in the Gutenberg editor. Feel free to adjust the text, layout, and add any additional elements to your post.

### Step 4: Using Custom Gutenberg Blocks
- **Unsplash Image Block:** This block allows you to search and insert images directly from Unsplash. You can add these to your post for more visual appeal.
- **Unsplash Card Block:** Use this block to create image cards with text. It's great for adding visually appealing sections or callouts in your posts.

### Step 5: Publishing Your Post
- **Review Your Post:** Before publishing, review the post to make sure everything looks as expected.
- **SEO Check:** Utilize the generated keywords and ensure they are well integrated into your content for better SEO performance.
- **Publish:** Once you're satisfied with the post, hit the publish button to make your content live.

### Additional Tips
- **Regularly Update Your API Keys:** To ensure uninterrupted service, keep your API keys up-to-date.
- **Explore the Blocks:** Experiment with the custom Gutenberg blocks to understand their full potential in enhancing your blog posts.
- **Feedback and Adjustments:** Use the plugin as a starting point and don't hesitate to manually adjust the generated content to better suit your voice and style.

## Screenshots
(Include screenshots of the plugin interface, settings page, and examples of posts generated by the plugin.)

## Frequently Asked Questions (FAQs)

### Q1: How do I set up the API keys required for the plugin?
**A:** After installing and activating the AI Image Post Generator plugin, navigate to the 'AIPG Settings' under the WordPress 'Settings' menu. In this section, you'll need to enter your API keys for the Chooch AI Vision Studio ImageChat, OpenAI. Each of these APIs is integral to the plugin's functionality. The Chooch AI API is used for analyzing and describing images, the OpenAI API for generating post content, and the Unsplash API for sourcing high-quality images. Ensuring that all these API keys are correctly entered and saved is crucial for the proper functioning of the plugin and its content generation capabilities.

### Q2: Can I use images from my WordPress media library with the plugin?
**A:** Yes, the plugin is designed to work seamlessly with the WordPress media library. You can select any image from your library as a featured image for your post. The plugin will then use the Chooch AI Vision Studio ImageChat API to describe this image, which in turn helps OpenAI to generate relevant content for your post, including SEO-optimized keywords.

### Q3: What if the generated post content doesn’t exactly fit my needs?
**A:** The AI Image Post Generator is designed to provide a strong starting point for your content creation process, but you might sometimes need to make adjustments. After the plugin generates a post, you can edit it just like any other WordPress post. Feel free to tweak the content, adjust the layout, or add personal touches to ensure the post aligns with your specific needs and style or click the generate button again.

### Q4: How does the plugin choose keywords for SEO optimization?
**A:** The AI Image Post Generator uses the OpenAI API to generate SEO-friendly keywords. When you select a featured image from your WordPress media library, the plugin uses ImageChat to describe the image. Based on this description, the OpenAI API generates relevant keywords that are not only tailored to the content of the image but also optimized for search engines. These keywords are used to enhance the SEO quality of the generated post, making it more likely to rank higher in search engine results.

### Q5: Is there a limit to the number of posts I can create using the plugin?
**A:** There is no inherent limit within the plugin itself on the number of posts you can create. However, keep in mind that the usage of Chooch AI Vision Studio ImageChat API, OpenAI API, and Unsplash API might be subject to their own limitations or quotas based on your subscription or plan with these services. It's important to be aware of the terms and limits of these APIs to ensure uninterrupted service while using the plugin.

## Changelog
- **Beta Version:** Initial release.

## Credits and Acknowledgments
This plugin, "AI Image Post Generator," is made possible through the integration of several powerful technologies and services, each contributing significantly to its functionality:

- **Chooch AI Vision Studio ImageChat API**: A sophisticated AI service provided by [Chooch AI](https://www.chooch.com/), this API plays a critical role in the plugin by analyzing and describing images selected from the WordPress media library. Their cutting-edge visual AI capabilities enable the core feature of our plugin, where the interpretation of images is transformed into descriptive text.

- **OpenAI API**: Our plugin leverages the capabilities of [OpenAI](https://openai.com/), particularly in content generation. After the Chooch AI Vision Studio ImageChat API provides an image description, the OpenAI API takes over to craft a relevant and engaging blog post, complete with an SEO-friendly structure. The integration of OpenAI's advanced language models is crucial in automating the creative process of blog writing, making our plugin a powerful tool for content creators.

- **Unsplash API**: We extend our gratitude to [Unsplash](https://unsplash.com/) for their API, which enriches our plugin by allowing users to seamlessly search and embed high-quality images into their WordPress posts. The vast and diverse collection of images available through Unsplash gives users the freedom to enhance their posts with visually striking and relevant photography, contributing greatly to the aesthetic appeal of their content.

- **10up**: The [Engineering Best Practices](https://10up.github.io/Engineering-Best-Practices/) and [Gutenberg training](https://gutenberg.10up.com/) by 10up were instrumental in shaping the plugin's structure and functionality. Additionally, the [10up-toolkit](https://github.com/10up/10up-toolkit) was utilized for generating plugin assets, playing a vital role in the development process.

The combined expertise and resources of Chooch AI, OpenAI, Unsplash, and 10up have been fundamental in bringing the vision of the "AI Image Post Generator" to life. Their contributions to the fields of AI, image processing, and WordPress development are greatly appreciated and have been crucial in the creation of this plugin.

## License
This plugin is released under the GNU General Public License v2 (or later). You can find a copy of this license at [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html).
