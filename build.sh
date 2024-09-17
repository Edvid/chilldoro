#!/usr/bin/bash

# builds with "next build" but outputs to docs

next build && \
mv docs/_next docs/next && \
grep -rl '\/_next' docs | \
xargs sed -i 's/\/_next/\/next/g' && \
sed -i 's/href=\"\/favicon.png/href=\"\/chilldoro\/favicon.png/g' docs/index.html
