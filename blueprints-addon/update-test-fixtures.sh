#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures for run-destroy
rm -r "tests/fixtures/run-destroy/output"
cp -r "tests/fixtures/run-destroy/input" "tests/fixtures/run-destroy/output"

./dist/bin/blueprints-addon.js \
  destroy component my-component/glimmer-loose \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy component my-component/glimmer-strict \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy component my-component/template-only-loose \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy component my-component/template-only-strict \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy helper my-helper/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy helper my-helper/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy modifier my-modifier/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy modifier my-modifier/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy service my-service/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  destroy util my-util/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

# Update fixtures for run-generate
rm -r "tests/fixtures/run-generate/output"
cp -r "tests/fixtures/run-generate/input" "tests/fixtures/run-generate/output"

./dist/bin/blueprints-addon.js \
  generate component my-component/glimmer-loose \
  --blueprint "glimmer-loose" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate component my-component/glimmer-strict \
  --blueprint "glimmer-strict" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate component my-component/template-only-loose \
  --blueprint "template-only-loose" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate component my-component/template-only-strict \
  --blueprint "template-only-strict" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate helper my-helper/class \
  --blueprint "class" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate helper my-helper/function \
  --blueprint "function" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate modifier my-modifier/class \
  --blueprint "class" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate modifier my-modifier/function \
  --blueprint "function" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate service my-service/class \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-addon.js \
  generate util my-util/function \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

# Update fixtures for run-new
rm -r "tests/fixtures/run-new/output"
cp -r "tests/fixtures/run-new/input" "tests/fixtures/run-new/output"

./dist/bin/blueprints-addon.js \
  new @my-org-ui/form \
  --location "ui/form" \
  --root "tests/fixtures/run-new/output"
