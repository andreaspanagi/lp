import os
import re
import requests
from bs4 import BeautifulSoup

def cleanup_html(input_filepath, output_filepath):
    """
    Cleans up an HTML file by extracting CSS, removing unnecessary scripts,
    and beautifying the HTML.
    """
    with open(input_filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # --- CSS Cleanup ---
    css_content = []

    # Extract from <style> tags
    for style_tag in soup.find_all('style'):
        if style_tag.string:
            css_content.append(style_tag.string)
        style_tag.decompose()

    # Extract from <link rel="stylesheet"> tags
    for link_tag in soup.find_all('link', rel='stylesheet'):
        href = link_tag.get('href')
        if href:
            if href.startswith(('http://', 'https://')):
                try:
                    response = requests.get(href)
                    if response.status_code == 200:
                        css_content.append(response.text)
                except requests.exceptions.RequestException as e:
                    print(f"Could not fetch CSS from {href}: {e}")
            elif os.path.exists(href):
                with open(href, 'r', encoding='utf-8') as css_file:
                    css_content.append(css_file.read())
        link_tag.decompose()

    # Write combined CSS to styles.css
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write('\n'.join(css_content))

    # Add a link to the new stylesheet
    new_link_tag = soup.new_tag('link', rel='stylesheet', href='styles.css')
    soup.head.append(new_link_tag)

    # --- JavaScript Cleanup ---
    # More conservative script removal
    scripts_to_remove = [
        'jquery.min.js',
        'jquery-migrate.min.js',
        'gtm4wp-contact-form-7-tracker.js'
    ]

    for script_tag in soup.find_all('script'):
        src = script_tag.get('src')
        if src and any(script_name in src for script_name in scripts_to_remove):
            script_tag.decompose()
        elif not src: # Remove all inline scripts
            script_tag.decompose()


    # --- Beautify and Save HTML ---
    beautified_html = soup.prettify()

    with open(output_filepath, 'w', encoding='utf-8') as f:
        f.write(beautified_html)

if __name__ == '__main__':
    cleanup_html('index.html', 'index.html')
