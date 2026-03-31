import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Posts
      S.listItem()
        .title('Posts')
        .child(
          S.list()
            .title('Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .child(S.documentList().title('All Posts').filter('_type == "post"')),
              S.listItem()
                .title('Posts by Category')
                .child(
                  S.documentTypeList('category')
                    .title('Posts by Category')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $categoryId in categories[]._ref')
                        .params({ categoryId }),
                    ),
                ),
            ]),
        ),
      // Authors
      S.listItem()
        .title('Authors')
        .child(S.documentList().title('Authors').filter('_type == "author"')),
      // Categories
      S.listItem()
        .title('Categories')
        .child(S.documentList().title('Categories').filter('_type == "category"')),
      // References
      S.listItem()
        .title('Projektová reference')
        .child(
          S.list()
            .title('Projektová reference')
            .items([
              S.listItem()
                .title('Všechny reference')
                .child(
                  S.documentList().title('Všechny reference').filter('_type == "projectReference"'),
                ),
              S.listItem()
                .title('Nastavení stránky')
                .child(
                  S.editor()
                    .id('referencePageSettings')
                    .schemaType('referencePageSettings')
                    .documentId('referencePageSettings'),
                ),
            ]),
        ),
      // Regular document types (excluding manually defined ones)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['post', 'author', 'category', 'projectReference', 'referencePageSettings'].includes(
            listItem.getId() as string,
          ),
      ),
    ])
