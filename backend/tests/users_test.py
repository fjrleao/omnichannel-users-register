def test_user_success_register(client):
    user_data = {
        'name': 'valid_name',
        'email': 'valid_email',
        'address': {
            'street': 'valid_street',
            'zip_code': 'valid_zip_code',
            'number': 'valid_number',
            'country': 'valid_country',
            'city': 'valid_city'
        }
    }

    response = client.post('/users', json=user_data)
    assert response.status_code == 201
    assert response.json["_id"] is not None
    assert response.json["name"] == 'valid_name'
    assert response.json["email"] == 'valid_email'
    assert response.json["address"]["street"] == 'valid_street'
    assert response.json["address"]["zip_code"] == 'valid_zip_code'
    assert response.json["address"]["number"] == 'valid_number'
    assert response.json["address"]["country"] == 'valid_country'
    assert response.json["address"]["city"] == 'valid_city'


def test_wrong_key_user_data(client):
    user_data = {
        'name': 'valid_name',
        'email_wrong': 'valid_email',
        'address': {
            'street': 'valid_street',
            'zip_code': 'valid_zip_code',
            'number': 'valid_number',
            'country': 'valid_country',
            'city': 'valid_city'
        }
    }

    response = client.post('/users', json=user_data)
    assert response.status_code == 400


def test_missing_key_user_data(client):
    user_data = {
        'name': 'valid_name',
        'address': {
            'street': 'valid_street',
            'zip_code': 'valid_zip_code',
            'number': 'valid_number',
            'country': 'valid_country',
            'city': 'valid_city'
        }
    }

    response = client.post('/users', json=user_data)
    assert response.status_code == 400


def test_user_data_already_exists(client):
    user_data = {
        'name': 'valid_name',
        'email': 'valid_email',
        'address': {
            'street': 'valid_street',
            'zip_code': 'valid_zip_code',
            'number': 'valid_number',
            'country': 'valid_country',
            'city': 'valid_city'
        }
    }

    response = client.post('/users', json=user_data)
    assert response.status_code == 409
