from django.db import models


class Shop(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50)
    shop = models.ForeignKey(Shop,
                             on_delete=models.CASCADE,
                             related_name="shop")

    def __str__(self):
        return self.name


class ShoppingList(models.Model):
    products = models.ManyToManyField(Product, related_name="products", through="ProductShoppingList")
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.id


class ProductShoppingList(models.Model):
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)