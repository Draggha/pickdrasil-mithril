export default [
  {
    'id': 'frameworks01',
    'title': 'Frameworks',
    'isLeaf': false,
    'children': [
      {
        'id': 'frameworks01-mithril',
        'title': 'Classic',
        'isLeaf': false,
        'children': [
          {
            'id': 'frameworks01-ampersand',
            'title': 'Ampersand',
            'isLeaf': true,
            'metaData': [
              {
                'type': 'status',
                'value': false,
                'tooltip': 'No virtual DOM used'
              }
            ],
            'children': []
          }
        ]
      },
      {
        'id': 'frameworks01-mithril',
        'title': 'Virtual-Dom',
        'isLeaf': false,
        'children': [
          {
            'id': 'frameworks01-mithril',
            'title': 'Mithril',
            'isLeaf': true,
            'metaData': [
              {
                'type': 'status',
                'value': true,
                'tooltip': 'Uses a virtual DOM implementation'
              }
            ],
            'children': []
          },
          {
            'id': 'frameworks01-react',
            'title': 'React',
            'isLeaf': true,
            'metaData': [
              {
                'type': 'status',
                'value': true,
                'tooltip': 'Uses a virtual DOM implementation'
              }
            ],
            'children': []
          },
          {
            'id': 'frameworks01-cycle',
            'title': 'Cycle',
            'isLeaf': true,
            'metaData': [
              {
                'type': 'status',
                'value': true,
                'tooltip': 'Uses a virtual DOM implementation'
              }
            ],
            'children': []
          }
        ]
      }
    ]
  }
]
