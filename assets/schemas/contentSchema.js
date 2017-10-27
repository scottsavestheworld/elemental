Schemas.content = {
  "ID": null,
  "checksum": null,
  "name": "Brand Content Page",
  "collection": "brand_content_page",
  "mutate": false,
  "isSchedulable": false,
  "isSearchable": false,
  "newBranchContent": false,
  "isAssignable": false,
  "enabled": true,
  "modified": "0001-01-01T00:00:00Z",
  "created": "0001-01-01T00:00:00Z",
  "lastModifiedByID": null,
  "fields": [
    {
      "label": "Title",
      "key": "title",
      "checksum": null,
      "primitive": "string",
      "collection": null,
      "position": null,
      "presentation": "text",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Page title for the page.",
      "question": "What is the title of this page?",
      "inUse": true
    },
    {
      "label": "Teaser Title",
      "key": "teaserTitle",
      "checksum": null,
      "primitive": "string",
      "collection": null,
      "position": null,
      "presentation": "text",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Short title for the page.",
      "question": "What should the title of this page be when space is limited?",
      "inUse": true
    },
    {
      "label": "Teaser Image",
      "key": "teaserImage",
      "checksum": null,
      "primitive": "resource",
      "collection": null,
      "position": null,
      "presentation": "resource",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Teaser image to showcase where teaser information is rendered",
      "question": "Which image do you want to draw attention to the teaser for this page?",
      "inUse": true
    },
    {
      "label": "Call To Action Label",
      "key": "ctaLabel",
      "checksum": null,
      "primitive": "string",
      "collection": null,
      "position": null,
      "presentation": "text",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Text to encourage people to visit this page.",
      "question": "How would you describe this page when space is limited?",
      "inUse": true
    },
    {
      "label": "Featured Page",
      "key": "isFeatured",
      "checksum": null,
      "defaultValue": false,
      "primitive": "bool",
      "collection": null,
      "position": null,
      "presentation": "checkbox",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Pages marked as featured are highlighted in featured marketing areas.",
      "question": "Would you like to feature this page?",
      "inUse": true
    },
    {
      "label": "Teaser Description",
      "key": "teaserDescription",
      "checksum": null,
      "primitive": "string",
      "collection": null,
      "position": null,
      "presentation": "text",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "A short description of the page.",
      "question": "How would you describe this page when space is limited?",
      "inUse": true
    },
    {
      "label": "Full Description",
      "key": "description",
      "checksum": null,
      "primitive": "string",
      "collection": null,
      "position": null,
      "presentation": "text",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "A full and detailed description of the page often used in metadata which helps to drive search engine ranking.",
      "question": "How would you describe this page in detail?",
      "inUse": true
    },
    {
      "label": "Sort Order",
      "key": "sortOrder",
      "checksum": null,
      "primitive": "int",
      "collection": null,
      "position": null,
      "presentation": "text_short",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "inUse": true
    },
    {
      "label": "Main Content",
      "key": "content",
      "checksum": null,
      "primitive": "markdown",
      "collection": null,
      "position": null,
      "presentation": "markdown",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Primary content for the page.",
      "question": "What would you like to communicate to visitors on this page?",
      "inUse": true
    },
    {
      "label": "Featured Image",
      "key": "featuredImage",
      "checksum": null,
      "primitive": "resource",
      "collection": null,
      "position": null,
      "presentation": "resource",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Featured image to showcase on this page.",
      "question": "Which image do you want to draw attention to on this page?",
      "inUse": true
    },
    {
      "label": "Eligibility Tag(s)",
      "key": "assignments",
      "checksum": null,
      "primitive": "assignment",
      "collection": "eligibility_tags",
      "position": null,
      "presentation": "assignment",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "Assign any number of eligibility tags to limit the availability of this product to those organizations with one or more matching assignments.",
      "inUse": true
    },
    {
      "label": "Ranking Priority",
      "key": "rankPriority",
      "checksum": null,
      "defaultValue": 0.5,
      "primitive": "float",
      "collection": null,
      "position": null,
      "presentation": "slider",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": null,
      "template": null,
      "usage": "A indicator of the priority of this page that may help this page be indexed more often and/or appear above other pages in search results.",
      "question": "How would you prioritize this page over others\t in search engines?",
      "inUse": true
    },
    {
      "label": "Content Sections",
      "key": "sections",
      "checksum": null,
      "primitive": "nested",
      "collection": null,
      "position": null,
      "presentation": "nested",
      "overRides": {
        "allow": false,
        "overWriteDescendants": null,
        "allowedOrganizationTypes": null,
        "restrictedOrganizationTypes": null,
        "restrictions": null
      },
      "restrictions": null,
      "fields": [
        {
          "label": "Section Title",
          "key": "sectionTitle",
          "checksum": null,
          "primitive": "string",
          "collection": null,
          "position": null,
          "presentation": "text",
          "overRides": null,
          "restrictions": null,
          "fields": null,
          "template": null
        },
        

        {
          "label": "Nested Nested",
          "key": "nestedNested",
          "checksum": null,
          "primitive": "nested",
          "collection": null,
          "position": null,
          "presentation": "nested",
          "overRides": {
            "allow": false,
            "overWriteDescendants": null,
            "allowedOrganizationTypes": null,
            "restrictedOrganizationTypes": null,
            "restrictions": null
          },
          "restrictions": null,
          "fields": [
            {
              "label": "Double Nested Content",
              "key": "nestedNestedField",
              "checksum": null,
              "primitive": "string",
              "collection": null,
              "position": null,
              "presentation": "text",
              "overRides": null,
              "restrictions": null,
              "fields": null,
              "template": null
            },
          ],
        },


        {
          "label": "Section Description",
          "key": "teaserDescription",
          "checksum": null,
          "primitive": "string",
          "collection": null,
          "position": null,
          "presentation": "text",
          "overRides": null,
          "restrictions": null,
          "fields": null,
          "template": null
        },
        {
          "label": "Full Description",
          "key": "description",
          "checksum": null,
          "primitive": "markdown",
          "collection": null,
          "position": null,
          "presentation": "markdown",
          "overRides": null,
          "restrictions": null,
          "fields": null,
          "template": null,
          "usage": "A full and detailed description of the feature."
        },
        {
          "label": "Display Width",
          "key": "displayWidth",
          "checksum": null,
          "defaultValue": "full",
          "primitive": "string",
          "collection": null,
          "position": null,
          "presentation": "select",
          "overRides": null,
          "restrictions": {
            "enums": [
              "full",
              "half"
            ]
          },
          "fields": null,
          "template": null,
          "usage": "Featured image would you like for this section?",
          "question": "Which image would you like to represent this feature in a feature list?"
        },
        {
          "label": "Section Image",
          "key": "sectionImage",
          "checksum": null,
          "primitive": "resource",
          "collection": null,
          "position": null,
          "presentation": "resource",
          "overRides": null,
          "restrictions": null,
          "fields": null,
          "template": null,
          "usage": "Featured image would you like for this section?",
          "question": "Which image would you like to represent this feature in a feature list?"
        },
        {
          "label": "Image Position",
          "key": "imagePosition",
          "checksum": null,
          "defaultValue": "right",
          "primitive": "string",
          "collection": null,
          "position": null,
          "presentation": "select",
          "overRides": null,
          "restrictions": {
            "enums": [
              "left",
              "right"
            ]
          },
          "fields": null,
          "template": null,
          "usage": "Position the image to the 'left' or 'right' of the section description.",
          "question": "Should this image be on the 'left' or 'right' of the description?"
        }
      ],
      "template": null,
      "inUse": true
    }
  ]
};
