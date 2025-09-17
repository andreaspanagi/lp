from bs4 import BeautifulSoup

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Read the CSS file
with open('styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Create a new style tag
new_style_tag = soup.new_tag('style')
new_style_tag.string = css_content

# Remove all existing style tags
for style_tag in soup.find_all('style'):
    style_tag.decompose()

# Remove the link to the external stylesheet if it exists
for link_tag in soup.find_all('link', {'rel': 'stylesheet', 'href': 'styles.css'}):
    link_tag.decompose()

# Add the new style tag to the head
soup.head.append(new_style_tag)

# Write the modified HTML back to the file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Inlined styles.css into index.html")
