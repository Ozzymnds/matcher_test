from django.db import models
from django.conf import settings

TIPOS_USUARIO = (
    ("ESTUDIANTE", "Estudiante"),
    ("EMPRESA", "Empresa"),
    ("DOCENTE", "Docente"),
)


class UsuarioTipoUsuario(models.Model):
    id_relacion = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, default=None,
                                   null=True, on_delete=models.DO_NOTHING, db_column="id_usuario")
    tipo_usuario = models.CharField(
        choices=TIPOS_USUARIO, null=False, default="ESTUDIANTE")

    # class Meta:
    #     db_table = "usuario_tipo_usuario"
