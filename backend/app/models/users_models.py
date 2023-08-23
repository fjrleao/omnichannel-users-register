from mongoengine import Document, StringField, EmbeddedDocumentField, EmbeddedDocument


class UserAddress(EmbeddedDocument):
    street = StringField(required=True)
    zip_code = StringField(required=True)
    number = StringField(required=True)
    country = StringField(required=True)
    city = StringField(required=True)


class User(Document):
    name = StringField(required=True)
    email = StringField(required=True)
    address = EmbeddedDocumentField(UserAddress)
