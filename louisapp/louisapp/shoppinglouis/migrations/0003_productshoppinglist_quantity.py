# Generated by Django 3.1.5 on 2021-01-21 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoppinglouis', '0002_auto_20210119_2307'),
    ]

    operations = [
        migrations.AddField(
            model_name='productshoppinglist',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
