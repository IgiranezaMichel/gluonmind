package com.gluonmind.backend.controller;

import com.gluonmind.backend.dto.*;
import com.gluonmind.backend.mapper.*;
import com.gluonmind.backend.model.*;
import com.gluonmind.backend.service.ContentService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ContentController {
    private final ContentService contentService;
    private final FaqMapper faqMapper;
    private final ServiceMapper serviceMapper;
    private final SoftwareMapper softwareMapper;
    private final TrustedCompanyMapper trustedCompanyMapper;
    private final AnnouncementMapper announcementMapper;
    private final PublicationMapper publicationMapper;

    public ContentController(ContentService contentService,
                             FaqMapper faqMapper,
                             ServiceMapper serviceMapper,
                             SoftwareMapper softwareMapper,
                             TrustedCompanyMapper trustedCompanyMapper,
                             AnnouncementMapper announcementMapper,
                             PublicationMapper publicationMapper) {
        this.contentService = contentService;
        this.faqMapper = faqMapper;
        this.serviceMapper = serviceMapper;
        this.softwareMapper = softwareMapper;
        this.trustedCompanyMapper = trustedCompanyMapper;
        this.announcementMapper = announcementMapper;
        this.publicationMapper = publicationMapper;
    }

    @GetMapping("/content/faqs")
    public List<FaqResponse> faqs() {
        return contentService.getActiveFaqs().stream().map(faqMapper::toResponse).toList();
    }

    @GetMapping("/content/services")
    public List<ServiceResponse> services() {
        return contentService.getActiveServices().stream().map(serviceMapper::toResponse).toList();
    }

    @GetMapping("/content/software")
    public List<SoftwareResponse> software() {
        return contentService.getActiveSoftware().stream().map(softwareMapper::toResponse).toList();
    }

    @GetMapping("/content/trusted")
    public List<TrustedCompanyResponse> trusted() {
        return contentService.getActiveTrustedCompanies().stream().map(trustedCompanyMapper::toResponse).toList();
    }

    @GetMapping("/content/announcements")
    public List<AnnouncementResponse> announcements() {
        return contentService.getActiveAnnouncements().stream().map(announcementMapper::toResponse).toList();
    }

    @GetMapping("/content/publications")
    public List<PublicationResponse> publications() {
        return contentService.getActivePublications().stream().map(publicationMapper::toResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/faqs")
    public FaqResponse createFaq(@Valid @RequestBody FaqRequest request) {
        Faq faq = contentService.saveFaq(request);
        return faqMapper.toResponse(faq);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/faqs/{id}")
    public FaqResponse updateFaq(@PathVariable String id, @Valid @RequestBody FaqRequest request) {
        Faq faq = contentService.updateFaq(id, request);
        return faqMapper.toResponse(faq);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/faqs/{id}")
    public void deleteFaq(@PathVariable String id) {
        contentService.deleteFaq(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/services")
    public ServiceResponse createService(@Valid @RequestBody ServiceRequest request) {
        ServiceItem item = contentService.saveService(request);
        return serviceMapper.toResponse(item);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/services/{id}")
    public ServiceResponse updateService(@PathVariable String id, @Valid @RequestBody ServiceRequest request) {
        ServiceItem item = contentService.updateService(id, request);
        return serviceMapper.toResponse(item);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/services/{id}")
    public void deleteService(@PathVariable String id) {
        contentService.deleteService(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/software")
    public SoftwareResponse createSoftware(@Valid @RequestBody SoftwareRequest request) {
        SoftwareItem item = contentService.saveSoftware(request);
        return softwareMapper.toResponse(item);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/software/{id}")
    public SoftwareResponse updateSoftware(@PathVariable String id, @Valid @RequestBody SoftwareRequest request) {
        SoftwareItem item = contentService.updateSoftware(id, request);
        return softwareMapper.toResponse(item);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/software/{id}")
    public void deleteSoftware(@PathVariable String id) {
        contentService.deleteSoftware(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/trusted")
    public TrustedCompanyResponse createTrusted(@Valid @RequestBody TrustedCompanyRequest request) {
        TrustedCompany company = contentService.saveTrustedCompany(request);
        return trustedCompanyMapper.toResponse(company);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/trusted/{id}")
    public TrustedCompanyResponse updateTrusted(@PathVariable String id, @Valid @RequestBody TrustedCompanyRequest request) {
        TrustedCompany company = contentService.updateTrustedCompany(id, request);
        return trustedCompanyMapper.toResponse(company);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/trusted/{id}")
    public void deleteTrusted(@PathVariable String id) {
        contentService.deleteTrustedCompany(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/content/announcements")
    public Page<AnnouncementResponse> listAnnouncements(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return contentService.getAllAnnouncements(pageable).map(announcementMapper::toResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/announcements")
    public AnnouncementResponse createAnnouncement(@Valid @RequestBody AnnouncementRequest request) {
        Announcement announcement = contentService.saveAnnouncement(request);
        return announcementMapper.toResponse(announcement);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/announcements/{id}")
    public AnnouncementResponse updateAnnouncement(@PathVariable String id, @Valid @RequestBody AnnouncementRequest request) {
        Announcement announcement = contentService.updateAnnouncement(id, request);
        return announcementMapper.toResponse(announcement);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/announcements/{id}")
    public void deleteAnnouncement(@PathVariable String id) {
        contentService.deleteAnnouncement(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/content/publications")
    public Page<PublicationResponse> listPublications(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return contentService.getAllPublications(pageable).map(publicationMapper::toResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/content/publications")
    public PublicationResponse createPublication(@Valid @RequestBody PublicationRequest request) {
        Publication publication = contentService.savePublication(request);
        return publicationMapper.toResponse(publication);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/content/publications/{id}")
    public PublicationResponse updatePublication(@PathVariable String id, @Valid @RequestBody PublicationRequest request) {
        Publication publication = contentService.updatePublication(id, request);
        return publicationMapper.toResponse(publication);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/content/publications/{id}")
    public void deletePublication(@PathVariable String id) {
        contentService.deletePublication(id);
    }
}
