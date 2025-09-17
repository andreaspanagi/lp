import os
from bs4 import BeautifulSoup

# Define the paths
html_path = 'index.html'
css_path = 'styles.css'

# Read the original HTML file
with open(html_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Find all style tags and concatenate their content
styles = "\n".join(style.string for style in soup.find_all('style') if style.string)

# Write the collected styles to the CSS file
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(styles)

# Remove all style tags from the soup
for style in soup.find_all('style'):
    style.decompose()

# Add a link to the new stylesheet in the head
new_link = soup.new_tag('link', rel='stylesheet', href=css_path)
soup.head.append(new_link)

# Write the modified HTML back to the original file
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print(f"Cleanup complete. Inline styles moved to {css_path} and HTML updated.")
