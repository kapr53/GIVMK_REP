# Generated by Django 2.2 on 2021-03-07 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0006_auto_20210306_1242'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='tel',
            field=models.CharField(blank=True, max_length=75, null=True, verbose_name='Phone'),
        ),
    ]
