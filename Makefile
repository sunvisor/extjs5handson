all: jsduck

jsduck:
	jsduck \
		--title "Ext JS 5 Hands-on" \
		--guides ./doc_contents/guide.json \
		--output ./doc/; \
		cp -r ~/mylib/ExtJS/ext-4.2.2.1144 ./doc/extjs-build;

.PHONY: all
