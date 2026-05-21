// Incrementa click_count en rider_links cada vez que se registra un click.
// Atómico desde el servidor — evita race conditions del PATCH desde el cliente.
onRecordCreate((e) => {
  const linkId = e.record.get("link");
  if (!linkId) return;
  try {
    const link = $app.findRecordById("rider_links", linkId);
    link.set("click_count", link.getInt("click_count") + 1);
    $app.save(link);
  } catch (_) {}
}, "link_clicks");
