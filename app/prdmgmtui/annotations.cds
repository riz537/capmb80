using ProductsMgmtService as service from '../../srv/products-srv';

annotate service.Products with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Value: description,
            },
            {
                $Type: 'UI.DataField',
                Value: price,
            },
            {
                $Type: 'UI.DataField',
                Value: discount,
            },
            {
                $Type: 'UI.DataField',
                Value: stock,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'Product Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Product Image',
            ID : 'ProductImage',
            Target : '@UI.FieldGroup#ProductImage',
        }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Value: ID,
        },
        {
            $Type: 'UI.DataField',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Value: price,
        },
        {
            $Type: 'UI.DataField',
            Value: discount,
        },
        {
            $Type: 'UI.DataField',
            Value: stock,
        },
        {
            $Type: 'UI.DataField',
            Value: status,
            Criticality : statusCriticality,
        },
    ],
    UI.SelectionFields           : [
        ID,
        name,
        stock,
        status
    ],
    UI.HeaderInfo : {
        TypeName : 'Product',
        TypeNamePlural : 'Products',
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : description,
        },
        ImageUrl : image,
    },
    UI.DataPoint #ID : {
        $Type : 'UI.DataPointType',
        Value : ID,
        Title : 'ID',
    },
    UI.DataPoint #price : {
        $Type : 'UI.DataPointType',
        Value : price,
        Title : 'Price',
    },
    UI.DataPoint #status : {
        $Type : 'UI.DataPointType',
        Value : status,
        Title : 'Status',
        Criticality: statusCriticality
    },
    UI.HeaderFacets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ID',
            Target : '@UI.DataPoint#ID',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'price',
            Target : '@UI.DataPoint#price',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'status',
            Target : '@UI.DataPoint#status',
        },
    ],
    UI.FieldGroup #ProductImage : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : image,
                Label : 'Image',
            },
        ],
    },
);

annotate service.Products with {
    ID          @Common.Label: 'ID';
    name        @Common.Label: 'Name';
    description @Common.Label: 'Description';
    price       @Common.Label: 'Price';
    discount    @Common.Label: 'Discount';
    stock       @Common.Label: 'Stock';
    status      @Common.Label: 'Status';

};

annotate service.Products with {

};
