const searchConfig  = {  

    // Search view
    search: {
        "defaultEntity": "person",
    
        "meter": {
            "component": "SummaryMeter",
            "config": {
                "colors": {
                    "all": "#cccccc",
                    "filters": "#1ACCA8"
                },
                "totalPath": "searchResults.recordCount.total"
            }
        },
    
        "facets": {
            "component": "Facets",
            "config": {
                "selected": "#1acca8",
                "unselected": "#dfdfdf",
                "displayThreshold": 3,
                "displayShort": 3,
                "displayLong": 5,
                "items": [
                {
                    "type": "dateRange",
                    "name": "created",
                    "tooltip": "Filter by date created."
                },
                {
                    "type": "dateRange",
                    "name": "updated",
                    "tooltip": "Filter by date updated."
                },
                {
                    "type": "string",
                    "name": "sources",
                    "tooltip": "Filter by source."
                },
                {
                    "type": "string",
                    "name": "status",
                    "tooltip": "Filter by status."
                },
                {
                    "type": "string",
                    "name": "country",
                    "tooltip": "Filter by country."
                },
                {
                    "type": "string",
                    "name": "area",
                    "tooltip": "Filter by area."
                }
                ]
            }
        },
    
        "selectedFacets": {
            "component": "SelectedFacets",
            "config": {}
        },
    
        "results": {
            "component": "ResultsList",
            "config": {
                "entityType": {
                    "path": "entityType",
                    "rootRelative": false
                },
                "pageLengths": [10, 20, 40, 80],
                "defaultIcon" : {
                    "type": "faCircle",
                    "color": "lightgrey"
                },
                "sort":{
                    "entities": ["person", "organization"],
                    "label": "Created On",
                    "sortBy": "createdOn",
                    "order": "descending"
                },
                "entities": {
                    "person": {
                        "icon": {
                            "type": "faUser",
                            "color": "#8C85DE"
                        },
                        "thumbnail": {
                            "component": "Image",
                            "config": {
                                //"arrayPath": "content.person.images.image",
                                //"path": "url",
                                "path": "content.person.images..*[?(@property === 'url')]",
                                "alt": "result thumbnail",
                                "style": {
                                    "width": "70px",
                                    "height": "70px"
                                }
                            }
                        },
                        "title": {
                            "id": {
                                "path": "uri"
                            },
                            "component": "Concat",
                            "config": {
                                "items": [
                                    {
                                        "arrayPath": "content.person.nameGroup",
                                        "path": "givenname.value",
                                        "suffix": " "
                                    },
                                    {
                                        "arrayPath": "content.person.nameGroup",
                                        "path": "surname.value"
                                    } 
                                ]
                            }
                            // "component": "Value",
                            // "config": {
                            //     "path": "uri"
                            // }
                        },
                        "items": [
                        {
                            "component": "Address",
                            "config": {
                                "arrayPath": "content.person.addresses.address",
                                "street1": "street",
                                "city": "city",
                                "state": "state",
                                "postal1": "postal",
                                "country": "country",
                                "style": {
                                    "width": "350px",
                                    "overflow": "hidden",
                                    "textOverflow": "ellipsis"
                                }
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                //"path": "content.person.phone",
                                "path": "content.person.contacts..[?(@[`type`] === 'phone')].value",
                                //"path": "content.person.contacts..value",
                                "className": "phone"
                            }
                        },
                        { 
                            //"arrayPath": "content.person.emails.email",
                            //"path": "value",
                            "path": "content.person.emails..*[?(@property === 'value')]",
                            "className": "email"
                        },
                        {
                            "path": "content.person.ssn.value"
                        }
                        ],
                        "categories": {
                            //"arrayPath": "content.person.sources",
                            //"path": "source.name",
                            "path": "$.content.person.sources..*[?(@property === 'name')]",
                            // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                            //"path": "content.person.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
                            "colors": {
                                "New York Times": "#d5e1de",
                                "USA Today": "#ebe1fa",
                                "Los Angeles Times": "#cae4ea",
                                "Wall Street Journal": "#fae9d3",
                                "Washington Post": "#fae3df",
                                "Chicago Tribune": "#f0f6d9"
                            }
                        },
                        "timestamp": {
                            //"arrayPath": "content.person.createdOn",
                            //"path": "ts",
                            "path": "content.person.createdOn..ts",
                            "type": "datetime",
                            "format": "yyyy-MM-dd",
                            "prefix": "Created on ",
                            "style": {
                                "fontStyle": "normal"
                            }
                        },
                        "status": { "path": "content.person.status" },
                        "resultActions": {
                            "component": "ResultActions",
                            "config": {
                                "id": "resultActions",
                                "arrayPath": "content.person.actions.action",
                                "action": {
                                "icon": "icon",
                                "color": "color",
                                "url": "url"
                                }
                            }
                        }
                    },
                    "organization": {
                        "icon": {
                            "type": "faIndustry",
                            "color": "#fdbcc6"
                        },
                        "thumbnail": {
                            "component": "Image",
                            "config": {
                                "arrayPath": "content.organization.images.image",
                                "path": "url",
                                "alt": "result thumbnail",
                                "style": {
                                    "width": "70px",
                                    "height": "70px"
                                }
                            }
                        },
                        "title": {
                            "id": {
                                "path": "uri"
                            },
                            "component": "Value",
                            "config": {
                                "arrayPath": "content.organization.names",
                                "path": "name.value"
                            }
                        },
                        "items": [
                        {
                            "component": "Value",
                            "config": {
                            "path": "content.organization.types.type"
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                            "path": "content.organization.country"
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                            "path": "content.organization.areas.area"
                            }
                        },
                        {
                            "component": "Concat",
                            "config": {
                                "items": [
                                    "Created by: ",
                                    {
                                        "path": "content.organization.createdOn.user"
                                    },
                                    {
                                        "path": "content.organization.createdOn.ts",
                                        "type": "DateTime",
                                        "prefix": " (",
                                        "suffix": ")",
                                    }
                                ]
                            }
                        }
                        ],
                        "categories": {
                            //"arrayPath": "content.organization.sources",
                            //"path": "source.name",
                            "path": "$.content.organization.sources..*[?(@property === 'name')]",
                            // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                            // "path": "$.content.organization.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
                            "colors": {
                                "New York Times": "#d5e1de",
                                "USA Today": "#ebe1fa",
                                "Los Angeles Times": "#cae4ea",
                                "Wall Street Journal": "#fae9d3",
                                "Washington Post": "#fae3df",
                                "Chicago Tribune": "#f0f6d9"
                            }
                        },
                        "timestamp": {
                            "arrayPath": "content.organization.createdOn",
                            "path": "ts",
                            "type": "datetime",
                            "format": "yyyy-MM-dd",
                            "prefix": "Created on ",
                            "style": {
                                "fontStyle": "normal"
                            }
                        }
                    }
                }
            }
        }
    }
  
}

export default searchConfig;
