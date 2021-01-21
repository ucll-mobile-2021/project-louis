from django.contrib import admin

# Register your models here.
from louisapp.shoppinglouis.models import Product, Shop, ShoppingList, ProductShoppingList

admin.site.register(Product)
admin.site.register(Shop)
admin.site.register(ShoppingList)
admin.site.register(ProductShoppingList)