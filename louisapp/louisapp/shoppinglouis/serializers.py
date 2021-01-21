from rest_framework import serializers

from louisapp.shoppinglouis.models import Product, Shop, ShoppingList


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'shop']


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'address']


class CompactShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name']


class CompactProductSerializer(serializers.ModelSerializer):
    shop = CompactShopSerializer(many=False, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'shop']


class ShoppingListSerializer(serializers.ModelSerializer):
    products = CompactProductSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingList
        fields = ['id', 'is_completed', 'products']
