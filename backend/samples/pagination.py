from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'   # frontend can send ?page=2&limit=20
    max_page_size = 100
