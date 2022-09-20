const searchConfig  = {  

    // Search view
    search: {
        "defaultEntity": "person",
    
        "results": {
            "component": "ResultsList",
            "config": {
                "entityType": {
                    "path": "entityType",
                    "rootRelative": false
                },
                "defaultIcon" : {
                    "type": "faCircle",
                    "color": "lightgrey"
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
                                "arrayPath": "content.person.images.image",
                                "path": "url",
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
                                "path": "uri"
                            },
                            "component": "Value",
                            "config": {
                                "path": "content.person.nameGroup.fullname.value"
                            }
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
                                //"path": "extracted.person.phone",
                                "path": "content.person.contacts..[?(@[`type`] === 'phone')].value",
                                //"path": "extracted.person.contacts..value",
                                "className": "phone"
                            }
                        },
                        { 
                            //"arrayPath": "extracted.person.emails.email",
                            //"path": "value",
                            "path": "content.person.emails..*[?(@property === 'value')]",
                            "className": "email"
                        },
                        {
                            "path": "content.person.ssn.value"
                        }
                        ],
                        "categories": {
                            //"arrayPath": "extracted.person.sources",
                            //"path": "source.name",
                            "path": "$.content.person.sources..*[?(@property === 'name')]",
                            // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                            //"path": "extracted.person.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
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
                            "path": "content.person.createdOn.ts",
                            "type": "datetime",
                            "format": "yyyy-MM-dd",
                            "prefix": "Created: ",
                            "style": {
                                "fontWeight": "bold"
                            }
                        },
                        "status": { 
                            "path": "content.person.status",
                            "prefix": "Status: "
                        },
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
                    }
                }
            }
        }
    }
  
}

export default searchConfig;