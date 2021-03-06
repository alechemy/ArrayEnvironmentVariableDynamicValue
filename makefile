identifier=com.alechemy.ArrayEnvironmentVariableDynamicValue
extensions_dir=$(HOME)/Library/Containers/com.luckymarmot.Paw/Data/Library/Application Support/com.luckymarmot.Paw/Extensions/

build:
	npm run build
	cp README.md ./build/$(identifier)/

clean:
	rm -Rf ./build/

install: clean build
	rm -rf "$(extensions_dir)$(identifier)/"
	mkdir -p "$(extensions_dir)$(identifier)/"
	cp -r ./build/$(identifier)/* "$(extensions_dir)$(identifier)/"

archive: build
	cd ./build/; zip -r ArrayEnvironmentVariableDynamicValue.zip "$(identifier)/"
