with open('app/layout.tsx', 'r') as f:
    content = f.read()

old = '''        />
      </head>'''

new = '''        />
        {site.integrations.adSenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.integrations.adSenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>'''

if old not in content:
    print("ERROR: expected block not found, no changes made")
else:
    content = content.replace(old, new, 1)
    with open('app/layout.tsx', 'w') as f:
        f.write(content)
    print("SUCCESS: AdSense script block inserted")
