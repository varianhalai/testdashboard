CURRENT_COMMIT=$(git rev-parse HEAD)
git checkout -b tmp-gh-pages && \
git add -f ./build && \
git commit -m "$CURRENT_COMMIT" && \
git subtree split --prefix build -b gh-pages && \
git push -f origin gh-pages:gh-pages && \
git checkout master

# try this regardless
git branch -D tmp-gh-pages
git branch -D gh-pages
