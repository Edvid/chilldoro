#!/usr/bin/bash

# builds with "next build" but outputs to docs

next build && \
mv docs/_next docs/next && \
grep -rl '/_next' docs | \
xargs sed -i 's/\/_next/\/next/g' && \
grep -rl 'href=\/favicon.ico' docs | \
xargs sed -i 's/href=\/favicon.ico/href=\/chilldoro\/favicon.ico/g'
