const searchConfig  = {  

    // Search view
    search: {
        "defaultEntity": "good-books-ds",
    
        "results": {
            "component": "ResultsList",
            "config": {
                "entityType": {
                    "path": "_index",
                    "rootRelative": false
                },
                "defaultIcon" : {
                    "type": "faCircle",
                    "color": "lightgrey"
                },
                "entities": {
                    "good-books-ds": {
                        "icon": {
                            "type": "faUser",
                            "color": "#8C85DE"
                        },
                        "thumbnail": {
                            "component": "Image",
                            "config": {
                                //"arrayPath": "extracted.person.images.image",
                                "path": "image",
                                //"path": "extracted.person.images..*[?(@property === 'url')]",
                                "alt": "result thumbnail",
                                "style": {
                                    "width": "auto",
                                    "height": "70px"
                                }
                            }
                        },
                        "title": {
                            "id": {
                                "path": "id"
                            },
                            "component": "Value",
                            "config": {
                                "path": "title"
                            }
                        },
                        "items": [
                        // {
                        //     "component": "Address",
                        //     "config": {
                        //         "arrayPath": "extracted.person.addresses.address",
                        //         "street1": "street",
                        //         "city": "city",
                        //         "state": "state",
                        //         "postal1": "postal",
                        //         "country": "country",
                        //         "style": {
                        //             "width": "350px",
                        //             "overflow": "hidden",
                        //             "textOverflow": "ellipsis"
                        //         }
                        //     }
                        // },
                        {
                            "component": "Value",
                            "config": {
                                "path": "authors",
                                "prefix": "Author(s): "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "original_publication_year",
                                "prefix": "Year Published: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "ratings_count",
                                "prefix": "Ratings Count: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "books_count",
                                "prefix": "Books Count: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "language_code",
                                "prefix": "Language Code: "
                            }
                        }
                        ],
                        // "categories": {
                        //     //"arrayPath": "extracted.person.sources",
                        //     //"path": "source.name",
                        //     "path": "$.extracted.person.sources..*[?(@property === 'name')]",
                        //     // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                        //     //"path": "extracted.person.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
                        //     "colors": {
                        //         "New York Times": "#d5e1de",
                        //         "USA Today": "#ebe1fa",
                        //         "Los Angeles Times": "#cae4ea",
                        //         "Wall Street Journal": "#fae9d3",
                        //         "Washington Post": "#fae3df",
                        //         "Chicago Tribune": "#f0f6d9"
                        //     }
                        // },
                        "timestamp": {
                            "path": "original_publication_year",
                            "type": "datetime",
                            "format": "yyyy",
                            "prefix": "Published: ",
                            "style": {
                                "fontStyle": "normal"
                            }
                        },
                        "status": { 
                            "path": "isbn",
                            "prefix": "ISBN: "
                        },
                        // "resultActions": {
                        //     "component": "ResultActions",
                        //     "config": {
                        //         "id": "resultActions",
                        //         "arrayPath": "extracted.person.actions.action",
                        //         "action": {
                        //             "icon": "icon",
                        //             "color": "color",
                        //             "url": "url"
                        //         }
                        //     }
                        // }
                    }
                }
            }
        }
    }
  
}

export default searchConfig;