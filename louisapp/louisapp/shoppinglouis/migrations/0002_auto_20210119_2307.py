# Generated by Django 3.1.5 on 2021-01-19 22:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoppinglouis', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='shop',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='shop', to='shoppinglouis.shop'),
            preserve_default=False,
        ),
    ]
