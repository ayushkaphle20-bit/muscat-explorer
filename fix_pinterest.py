with open('app/layout.tsx', 'r') as f:
    content = f.read()

old = '''  verification: site.integrations.googleSearchConsoleVerification
    ? { google: site.integrations.googleSearchConsoleVerification }
    : undefined,
};'''

new = '''  verification: {
    ...(site.integrations.googleSearchConsoleVerification
      ? { google: site.integrations.googleSearchConsoleVerification }
      : {}),
    other: {
      "p:domain_verify": "38239d3c896a97f0d18c41584b7225f6",
    },
  },
};'''

if old not in content:
    print("ERROR: expected block not found, no changes made")
else:
    content = content.replace(old, new, 1)
    with open('app/layout.tsx', 'w') as f:
        f.write(content)
    print("SUCCESS: Pinterest verification tag added")
