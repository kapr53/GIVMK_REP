# Generated by Django 2.2 on 2021-03-07 01:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0007_client_tel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PhoneClient',
        ),
    ]
