import requests
import json

API_URL_COUNTRIES = 'https://api.covid19api.com/countries'
API_URL_CONFIRMED = 'https://api.covid19api.com/total/country/spain/status/confirmed'


def get_countries():
    response = requests.get(API_URL_COUNTRIES)

    if response.status_code != 200:
        pass  # Raise error?
        print('Error1 xD')
        return

    data = json.loads(response.text)

    countries = []
    for country in data:
        country_name = country['Country'].strip().lower()
        if country_name != '':
            countries.append(country_name)

    return countries


def get_confirmed(country=None):

    if country:
        response = requests.get(f'https://api.covid19api.com/total/country/{country}/status/confirmed')

        if response.status_code != 200:
            pass  # Raise error?
            print('Error2 xD')
            return

        data = json.loads(response.text)
        for item in data:
            print(item)

        return data

    else:
        countries = get_countries()
        for country in countries:
            response = requests.get(f'https://api.covid19api.com/total/country/{country}/status/confirmed')

            if response.status_code != 200:
                pass  # Raise error?
                print('Error2 xD')
                return

            data = json.loads(response.text)
            for item in data:
                print(item)
