from django.db import models
from core.models import  Base, BasePerson, BasePhone
from django.utils.translation import gettext_lazy as _
from imagekit.models import ImageSpecField
from pilkit.processors import ResizeToFill
from django.forms import model_to_dict
from datetime import date
from GIVMK.settings import MEDIA_URL, STATIC_URL

# Create your models here.
def custom_upload_to(instance, filename):
    '''Este metodo elimina de nuestra base de datos una imagen
    de una instancia se esta ya tenia una imagen previa'''
    # Obtiene la imagen antigua de la instancia en cuestion
    old_instance = Client.objects.get(pk=instance.pk)
    # Borra la imagen de la que se ha seleccionado
    old_instance.foto.delete()
    return 'Clientes/%Y/%m/%d' + filename

class Client(BasePerson):
    NIT = models.CharField('NIT', max_length=15, blank=True, null=True)
    estado = models.BooleanField('Estado', default=True)
    img = models.ImageField(
        upload_to='Clientes/%Y/%m/%d', null=True, blank=True, verbose_name='Avatar')
    # campo que creara la imagen en thubnail
    img_thubmnail = ImageSpecField(
        source='img',
        processors=[ResizeToFill(100, 100)],
        format='JPEG',
        options={'quality': 100})

    def toJSON(self):
        item = model_to_dict(self)
        item['nombre'] = self.getFullName()
        item['edad'] = self.edad()
        item['img'] = self.get_img()
        return item

    def phoneFav(self):
        for p in PhoneClient.objects.filter(client_id=self.id):
            if  p.is_favorite:
                return p.phone_number

    def get_img(self):
        if self.img_thubmnail:
            return '{}{}'.format(MEDIA_URL, self.img_thubmnail)
        return '{}{}'.format(STATIC_URL, 'core/img/NoImg.png')

    class Meta:
        verbose_name = _('Client')
        verbose_name_plural = _('Customers')

    def getFullName(self):
        return '%s %s' % (self.firts_name, self.last_name)

    def __str__(self):
        return self.getFullName()

    def clean(self):
        pass
