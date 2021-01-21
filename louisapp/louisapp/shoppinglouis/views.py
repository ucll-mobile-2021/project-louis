import json

from rest_framework import viewsets


# Create your views here.
from rest_framework.decorators import action
from rest_framework.response import Response

from louisapp.shoppinglouis.models import Product, Shop, ShoppingList, ProductShoppingList
from louisapp.shoppinglouis.serializers import ProductSerializer, ShopSerializer, ShoppingListSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

    @action(detail=False, methods=['post'])
    def add_product(self, request):
        body = json.loads(request.body)
        product = Product.objects.get(id=int(body['productId']))
        shoppingList = ShoppingList.objects.all()[0]
        m = ProductShoppingList(product=product, shopping_list=shoppingList)
        m.save()
        return Response({'status': 'ok'})


    @action(detail=False, methods=['post'])
    def delete_product(self, request):
        body = json.loads(request.body)
        productId = int(body['productId'])
        product = Product.objects.get(id=productId)
        ProductShoppingList.objects.filter(product=product).delete()
        return Response({'status': 'ok'})
