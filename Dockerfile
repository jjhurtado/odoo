FROM odoo:17.0

ARG LOCALE=en_US.UTF-8

ENV LANGUAGE=${LOCALE}
ENV LC_ALL=${LOCALE}
ENV LANG=${LOCALE}

USER 0

RUN apt-get -y update && apt-get install -y --no-install-recommends locales netcat-openbsd \
    && locale-gen ${LOCALE}


# Crear directorio de módulos y asignar permisos correctos
RUN mkdir -p /mnt/extra-addons && chown -R odoo:odoo /mnt/extra-addons

# Copiar módulos personalizados al contenedor
COPY --chown=odoo:odoo ./custom-modules /mnt/extra-addons

# Agregar la ruta de addons personalizados
ENV ODOO_EXTRA_ADDONS="/mnt/extra-addons"

WORKDIR /app

COPY --chmod=755 entrypoint.sh ./

ENTRYPOINT ["/bin/sh"]

CMD ["entrypoint.sh"]

