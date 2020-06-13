import json
import pathlib
from copy import deepcopy
from goodtables import validate


# General


def test_validate():
    report = validate({'resources': [{'path': 'data/table.csv'}]})
    assert report.valid


def test_validate_from_dict():
    with open('data/package/datapackage.json') as file:
        report = validate(json.load(file), base_path='data/package')
        assert report.valid


def test_validate_from_dict_invalid():
    with open('data/invalid/datapackage.json') as file:
        report = validate(json.load(file), base_path='data/invalid')
        assert report.flatten(
            ['tablePosition', 'rowPosition', 'fieldPosition', 'code']
        ) == [
            [1, 3, None, 'blank-row'],
            [1, 3, None, 'primary-key-error'],
            [2, 4, None, 'blank-row'],
            # This error should be removed with better lookup table extraction
            [2, 5, None, 'foreign-key-error'],
        ]


def test_validate_from_path():
    report = validate('data/package/datapackage.json')
    assert report.valid


def test_validate_from_path_invalid():
    report = validate('data/invalid/datapackage.json')
    assert report.flatten(['tablePosition', 'rowPosition', 'fieldPosition', 'code']) == [
        [1, 3, None, 'blank-row'],
        [1, 3, None, 'primary-key-error'],
        [2, 4, None, 'blank-row'],
        # This error should be removed with better lookup table extraction
        [2, 5, None, 'foreign-key-error'],
    ]


def test_validate_from_zip():
    report = validate('data/package.zip', source_type='package')
    assert report.valid


def test_validate_from_zip_invalid():
    report = validate('data/invalid.zip', source_type='package')
    assert report.flatten(['tablePosition', 'rowPosition', 'fieldPosition', 'code']) == [
        [1, 3, None, 'blank-row'],
        [1, 3, None, 'primary-key-error'],
        [2, 4, None, 'blank-row'],
        # This error should be removed with better lookup table extraction
        [2, 5, None, 'foreign-key-error'],
    ]


def test_validate_with_non_tabular():
    report = validate(
        {'resources': [{'path': 'data/table.csv'}, {'path': 'data/file.txt'}]}
    )
    assert report.valid


def test_validate_invalid_descriptor_path():
    report = validate('bad/datapackage.json')
    assert report.flatten(['code', 'details']) == [
        ['package-error', 'Unable to load JSON at "bad/datapackage.json"']
    ]


def test_validate_invalid_package():
    report = validate({'resources': [{'path': 'data/table.csv', 'schema': 'bad'}]})
    assert report.flatten(['code', 'details']) == [
        ['package-error', 'Not resolved Local URI "bad" for resource.schema']
    ]


def test_validate_invalid_package_strict():
    report = validate({'resources': [{'path': 'data/table.csv'}]}, strict=True)
    assert report.flatten(['code', 'details']) == [
        [
            'package-error',
            'Descriptor validation error: {\'path\': \'data/table.csv\', \'profile\': \'data-resource\'} is not valid under any of the given schemas at "resources/0" in descriptor and at "properties/resources/items/oneOf" in profile',
        ]
    ]


def test_validate_invalid_table():
    report = validate({'resources': [{'path': 'data/invalid.csv'}]})
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, 3, 'blank-header'],
        [None, 4, 'duplicate-header'],
        [2, 3, 'missing-cell'],
        [2, 4, 'missing-cell'],
        [3, 3, 'missing-cell'],
        [3, 4, 'missing-cell'],
        [4, None, 'blank-row'],
        [5, 5, 'extra-cell'],
    ]


def test_validate_pathlib_source():
    report = validate(pathlib.Path('data/package/datapackage.json'))
    assert report.valid


def test_validate_package_infer():
    report = validate('data/infer/datapackage.json')
    assert report.valid


def test_validate_package_dialect_header_false():
    descriptor = {
        'resources': [
            {
                'name': 'name',
                'data': [['John', '22'], ['Alex', '33'], ['Paul', '44']],
                'schema': {
                    'fields': [{'name': 'name'}, {'name': 'age', 'type': 'integer'}]
                },
                'dialect': {'header': False},
            }
        ]
    }
    report = validate(descriptor)
    assert report.valid


# Integrity

DESCRIPTOR_SH = {
    'resources': [
        {
            'name': 'resource1',
            'path': 'data/table.csv',
            'bytes': 30,
            'hash': 'sha256:a1fd6c5ff3494f697874deeb07f69f8667e903dd94a7bc062dd57550cea26da8',
        }
    ]
}


def test_validate_integrity():
    source = deepcopy(DESCRIPTOR_SH)
    report = validate(source)
    assert report.valid


def test_validate_integrity_invalid():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0]['bytes'] += 1
    source['resources'][0]['hash'] += 'a'
    report = validate(source)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, None, 'size-error'],
        [None, None, 'hash-error'],
    ]


def test_validate_integrity_size():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0].pop('hash')
    report = validate(source)
    assert report.valid


def test_validate_integrity_size_invalid():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0]['bytes'] += 1
    source['resources'][0].pop('hash')
    report = validate(source)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, None, 'size-error'],
    ]


def test_validate_integrity_hash():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0].pop('bytes')
    report = validate(source)
    assert report.valid


def test_check_file_integrity_hash_invalid():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0].pop('bytes')
    source['resources'][0]['hash'] += 'a'
    report = validate(source)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, None, 'hash-error'],
    ]


def test_check_file_integrity_hash_not_supported_algorithm():
    source = deepcopy(DESCRIPTOR_SH)
    source['resources'][0].pop('bytes')
    source['resources'][0]['hash'] = source['resources'][0]['hash'].replace('sha', 'bad')
    report = validate(source)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, None, 'source-error'],
    ]


DESCRIPTOR_FK = {
    'resources': [
        {
            'name': 'cities',
            'data': [
                ['id', 'name', 'next_id'],
                [1, 'london', 2],
                [2, 'paris', 3],
                [3, 'rome', 4],
                [4, 'rio', None],
            ],
            'schema': {
                'fields': [
                    {'name': 'id', 'type': 'integer'},
                    {'name': 'name', 'type': 'string'},
                    {'name': 'next_id', 'type': 'integer'},
                ],
                'foreignKeys': [
                    {'fields': 'next_id', 'reference': {'resource': '', 'fields': 'id'}},
                    {
                        'fields': 'id',
                        'reference': {'resource': 'people', 'fields': 'label'},
                    },
                ],
            },
        },
        {
            'name': 'people',
            'data': [['label', 'population'], [1, 8], [2, 2], [3, 3], [4, 6]],
        },
    ],
}


def test_validate_foreign_key_error():
    descriptor = deepcopy(DESCRIPTOR_FK)
    report = validate(descriptor)
    assert report.valid


def test_validate_foreign_key_not_defined():
    descriptor = deepcopy(DESCRIPTOR_FK)
    del descriptor['resources'][0]['schema']['foreignKeys']
    report = validate(descriptor)
    assert report.valid


def test_validate_foreign_key_self_referenced_resource_violation():
    descriptor = deepcopy(DESCRIPTOR_FK)
    del descriptor['resources'][0]['data'][4]
    report = validate(descriptor)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [4, None, 'foreign-key-error'],
    ]


def test_validate_foreign_key_internal_resource_violation():
    descriptor = deepcopy(DESCRIPTOR_FK)
    del descriptor['resources'][1]['data'][4]
    report = validate(descriptor)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [5, None, 'foreign-key-error'],
    ]


def test_validate_foreign_key_internal_resource_violation_non_existent():
    descriptor = deepcopy(DESCRIPTOR_FK)
    del descriptor['resources'][1]
    report = validate(descriptor)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [2, None, 'foreign-key-error'],
        [3, None, 'foreign-key-error'],
        [4, None, 'foreign-key-error'],
        [5, None, 'foreign-key-error'],
    ]


# Issues


def test_validate_package_mixed_issue_170():
    report = validate('data/infer/datapackage.json')
    assert report.valid


def test_validate_package_invalid_json_issue_192():
    report = validate('data/invalid.json', source_type='package')
    assert report.flatten(['code', 'details']) == [
        [
            'package-error',
            'Unable to parse JSON at "data/invalid.json". Expecting property name enclosed in double quotes: line 2 column 5 (char 6)',
        ]
    ]


def test_validate_geopoint_required_constraint_issue_231():
    # We check here that it doesn't raise exceptions
    report = validate('data/geopoint/datapackage.json')
    assert not report.valid


def test_validate_package_number_test_issue_232():
    # We check here that it doesn't raise exceptions
    report = validate('data/number/datapackage.json')
    assert not report.valid


def test_validate_package_with_schema_issue_348():
    descriptor = {
        'resources': [
            {
                'name': 'people',
                'data': [
                    ['id', 'name', 'surname'],
                    ['p1', 'Tom', 'Hanks'],
                    ['p2', 'Meryl', 'Streep'],
                ],
                'schema': {
                    'fields': [
                        {'name': 'id', 'type': 'string'},
                        {'name': 'name', 'type': 'string'},
                        {'name': 'surname', 'type': 'string'},
                        {'name': 'dob', 'type': 'date'},
                    ]
                },
            }
        ]
    }
    report = validate(descriptor)
    assert report.flatten(['rowPosition', 'fieldPosition', 'code']) == [
        [None, 4, 'missing-header'],
        [2, 4, 'missing-cell'],
        [3, 4, 'missing-cell'],
    ]