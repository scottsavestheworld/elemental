Schemas.organizations = {
  name: "Edit Organization",
  "fields": [
    {
      "label": "Orgaization Name",
      "key": "name",
      "primitive": "string",
      "presentation": "text",
      "isRequired" : true,
    },
    {
      "label": "External ID",
      "key": "externalID",
      "primitive": "string",
      "presentation": "text",
      "isRequired" : true,
    },
    {
      "label": "Organization Type",
      "key": "type",
      "primitive": "string",
      "presentation": "text",
      "isRequired" : true,
    },
    {
      "label": "Organization Status",
      "key": "status",
      "primitive": "string",
      "presentation": "text",
      "isRequired" : true,
    },
  ]
}